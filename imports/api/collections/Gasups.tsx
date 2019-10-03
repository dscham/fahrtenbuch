import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

class GasupsCollection extends Mongo.Collection {
    constructor(collectionName: string) {
        super(collectionName)
    };
}

const Gasups = new GasupsCollection('gasups');
export default Gasups;

export interface Gasup {
    userId: string,
    date: string,
    amount: number,
    driven: number,
    price: number
}

export const insert = {
    name: 'gasups.insert',

    // Factor out validation so that it can be run independently (1)
    validate(args: any) {
        new SimpleSchema({
            userId: {type: String},
            date: { type: String },
            amount: { type: Number },
            driven: { type: Number },
            price: { type: Number }
        }).validate(args)
    },

    // Factor out Method body so that it can be called independently (3)
    run(gasup: Gasup) {
        Gasups.insert(gasup);
    },

    // Call Method by referencing the JS object (4)
    // Also, this lets us specify Meteor.apply options once in
    // the Method implementation, rather than requiring the caller
    // to specify it at the call site.
    call(args: any, callback: Function) {
        const options = {
            returnStubValue: true,     // (5)
            throwStubExceptions: true  // (6)
        }

        Meteor.apply(this.name, [args], options, callback);
    }
};

if(Meteor.isServer) {
    Meteor.methods({
        [insert.name]: function (gasup: Gasup) {
            insert.validate.call(this, gasup);
            insert.run.call(this, gasup);
        }
    });

    Meteor.publish(
        'gasups', () => {
            if(!!Meteor.user()) {
                return Gasups.find({userId: Meteor.userId()});
            }
        }
    );
}
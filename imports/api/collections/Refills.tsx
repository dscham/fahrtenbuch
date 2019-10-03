import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

class RefillsCollection extends Mongo.Collection {
    constructor(collectionName: string) {
        super(collectionName)
    };
}

const Refills = new RefillsCollection('refills');
export default Refills;

export interface Refill {
    userId: string,
    date: string,
    amount: number,
    driven: number,
    price: number
}

export const insert = {
    name: 'refills.insert',

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
    run(refill: Refill) {
        Refills.insert(refill);
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
        [insert.name]: function (refill: Refill) {
            insert.validate.call(this, refill);
            insert.run.call(this, refill);
        }
    });

    Meteor.publish(
        'refills', () => {
            if(!!Meteor.user()) {
                return Refills.find({userId: Meteor.userId()});
            }
        }
    );
}
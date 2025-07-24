export class ApiClientTestData{
    
    static get validCredentials() {
        return {
            username: 'admin',
            password: 'password123'
        };
    }
    static get createBookingData() {
        return {
            firstname : 'Jim',
            lastname : 'Brown',
            totalprice : 111,
            depositpaid : true,
            bookingdates : {
                checkin : '2018-01-01',
                checkout : '2019-01-01'
            },
            additionalneeds : "Breakfast"
        };
    }  
    
    static get updatedateData() {
        const today = new Date();
        const checkinDate = today.toISOString().split('T')[0];
        const futureDate = new Date(today);
        futureDate.setDate(today.getDate() + 7);
        const checkoutDate = futureDate.toISOString().split('T')[0];
        return {
            firstname : 'Louis',
            lastname : 'Payne',
            totalprice : 250,
            depositpaid : true,
            bookingdates : {
                checkin : checkinDate,
                checkout : checkoutDate
            },
            additionalneeds : "Breakfast"
        };
    }
    
    static get partialUpdateData() {
        return {
        firstname: "Steve",
        lastname: "Johnson"
        };
    }
    static get authSchema() {
        return {
            type: "object",
            properties: {
                token: {type: "string" }
            },
            required: ["token"]
        };
    }
    static get bookingSchema() {
        return {
            type: "object",
            properties: {
                firstname: { type: "string" },
                lastname: { type: "string" },
                totalprice: { type: "number" },
                depositpaid: { type: "boolean" },
                bookingdates: {
                type: "object",
                properties: {
                    checkin: { type: "string", format: "date" },
                    checkout: { type: "string", format: "date" }
                },
                required: ["checkin", "checkout"]
                },
                additionalneeds: { type: "string" }
            },
            required: [
                "firstname",
                "lastname",
                "totalprice",
                "depositpaid",
                "bookingdates",
                "additionalneeds"
            ]
        };
    }
    static get fullBookingSchema() {
        return {
            type: "object",
            properties: {
                bookingid: { type: "number" },
                booking: {
                    type: "object",
                    properties: {
                        firstname: { type: "string" },
                        lastname: { type: "string" },
                        totalprice: { type: "number" },
                        depositpaid: { type: "boolean" },
                        bookingdates: {
                            type: "object",
                            properties: {
                                checkin: { type: "string", format: "date" },
                                checkout: { type: "string", format: "date" }
                            },
                            required: ["checkin", "checkout"]
                        },
                        additionalneeds: { type: "string" }
                    },
                    required: [
                        "firstname",
                        "lastname",
                        "totalprice",
                        "depositpaid",
                        "bookingdates",
                        "additionalneeds"
                    ]
                }
            },
            required: ["bookingid", "booking"]
        };
    }
    static get bookingIdsShema() {
        return {
            type: 'array',
            properties: {
                bookingid: {type: 'number'}
            },
            required: ['bookingid'],
            additionalProperties: false
        }
    };
}
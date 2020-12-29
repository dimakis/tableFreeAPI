// creating the collections for use with the tableFree react app
db.createCollection("tables");
db.createCollection("users");

// populating the tables collection
db.tables.insertMany([
    {
        tableName: 100,
        id: 100,
        timeSlots: [
            {
                time: "12-1",
                isBooked: true,
                bookedBy: "",
            },
            {
                time: "1-2",
                bookedBy: "",
                isBooked: true,
            },
        ],
    },
    {
        tableName: 101,
        id: 101,
        timeSlots: [
            {
                time: "12-1",
                bookedBy: "",
                isBooked: true,
            },
            {
                time: "1-2",
                bookedBy: "",
                isBooked: true,
            },
        ],
    },
    {
        tableName: 102,
        id: 102,
        timeSlots: [
            {
                time: "12-1",
                bookedBy: "",
                isBooked: true,
            },
            {
                time: "1-2",
                bookedBy: "",
                isBooked: true,
            },
        ],
    },
    {
        tableName: 109,
        id: "109",
        timeSlots: [
            {
                time: "1-2",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "4-5",
                bookedBy: "",
                isBooked: false,
            },
        ],
    },
    {
        tableName: 110,
        timeSlots: [
            {
                time: "1-2",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "2-3",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "3-4",
                bookedBy: "",
                isBooked: false,
            },
        ],
        id: "JgEeP1C",
    },
    {
        tableName: "107",
        timeSlots: [
            {
                time: "1-2",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "2-3",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "3-4",
                bookedBy: "",
                isBooked: false,
            },
        ],
        id: "z-clpAI",
    },
    {
        tableName: "111",
        timeSlots: [
            {
                time: "1-2",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "2-3",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "3-4",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "4-5",
                bookedBy: "",
                isBooked: false,
            },
        ],
        id: "DaHRu11",
    },
    {
        tableName: "160",
        timeSlots: [
            {
                time: "1-2",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "2-3",
                bookedBy: "",
                isBooked: false,
            },
            {
                time: "4-5",
                bookedBy: "",
                isBooked: false,
            },
        ],
        id: "IQ8M_M9",
    },
]);

// populating the users collection
db.users.insertMany([
    {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@abc.com",
        username: "john_doe@gmail.com",
        status: "Terminated",
        password: 123456789,
        isAdmin: true,
    },
    {
        id: 2,
        first_name: "Jane",
        last_name: "Doe",
        email: "janedoe@abc.com",
        gender: "Female",
        status: "New",
        password: 123456789,
        isAdmin: false,
    },
]);

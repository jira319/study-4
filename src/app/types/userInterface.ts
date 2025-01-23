export interface userData {
    id: number,
    name: string,
    email: string,
    password: string,
    created_at: string,
    updated_at?: string  
};

export const initialValueUser: userData = {
    id: 0,
    name: "",
    email: "",
    password: "",
    created_at: "",
    updated_at: ""
};

export const FakeDataUser: userData[] = [
    {
        id: 1111,
        name: "Yow",
        email: "Yow@Yow",
        password: "123",
        created_at: "2023-05-08T11:06:57.000000Z",
        updated_at: "2023-05-08T11:06:57.000000Z",
    },
    {
        id: 3109,
        name: "Jann",
        email: "Jann@gmail.com",
        password: "123",
        created_at: "2023-05-08T11:06:57.000000Z",
        updated_at: "2023-05-08T11:06:57.000000Z",
    },
    {
        id: 2123,
        name: "Jira",
        email: "Jira@gmail.com",
        password: "123",
        created_at: "2023-05-08T11:06:57.000000Z",
        updated_at: "2023-05-08T11:06:57.000000Z",
    },
    {
        id: 3234,
        name: "Mika",
        email: "Mika@gmail.com",
        password: "123",
        created_at: "2023-06-10T12:00:00.000000Z",
        updated_at: "2023-06-10T12:00:00.000000Z",
    },
    {
        id: 4345,
        name: "Liam",
        email: "Liam@gmail.com",
        password: "123",
        created_at: "2023-07-01T09:30:00.000000Z",
        updated_at: "2023-07-01T09:30:00.000000Z",
    },
    {
        id: 5456,
        name: "Nina",
        email: "Nina@gmail.com",
        password: "123",
        created_at: "2023-07-15T15:45:00.000000Z",
        updated_at: "2023-07-15T15:45:00.000000Z",
    },
    {
        id: 6567,
        name: "Zara",
        email: "Zara@gmail.com",
        password: "123",
        created_at: "2023-08-01T10:00:00.000000Z",
        updated_at: "2023-08-01T10:00:00.000000Z",
    },
    {
        id: 7678,
        name: "Noah",
        email: "Noah@gmail.com",
        password: "123",
        created_at: "2023-08-20T08:15:00.000000Z",
        updated_at: "2023-08-20T08:15:00.000000Z",
    },
    {
        id: 8789,
        name: "Eli",
        email: "Eli@gmail.com",
        password: "123",
        created_at: "2023-09-01T14:30:00.000000Z",
        updated_at: "2023-09-01T14:30:00.000000Z",
    },
    {
        id: 9890,
        name: "Tara",
        email: "Tara@gmail.com",
        password: "123",
        created_at: "2023-09-10T18:45:00.000000Z",
        updated_at: "2023-09-10T18:45:00.000000Z",
    },
    {
        id: 1012,
        name: "Aria",
        email: "Aria@gmail.com",
        password: "123",
        created_at: "2023-09-25T20:00:00.000000Z",
        updated_at: "2023-09-25T20:00:00.000000Z",
    },
]
export default FakeDataUser;

// export const FakeDataUser : userData[] = []
// export default FakeDataUser;


/**
 * Not in use
 */

const commentsData = [
    {
        id: 1,
        name: "Ram sunder",
        message:
            "this is an comment this is an comment this is an comment this is an comment this is an comment this is an comment this is an comment ",
        createdAt: new Date("7 Jan 2024").getTime(),
        parent: null,
    },
    {
        id: 2,
        name: "Sita sunder",
        message: "this is an comment",
        createdAt: new Date("8 Jan 2024").getTime(),
        parent: 1,
    },
    {
        id: 3,
        name: "Shyam sunder",
        message: "this is an comment",
        createdAt: new Date("9 Jan 2024").getTime(),
        parent: 1,
    },
    {
        id: 4,
        name: "Radha sunder",
        message: "this is an comment",
        createdAt: new Date("8 Jan 2024").getTime(),
        parent: null,
    },
    {
        id: 5,
        name: "Ram sunder",
        message: "this is an comment",
        createdAt: new Date("9 Jan 2024").getTime(),
        parent: null,
    },
    {
        id: 6,
        name: "Ram sunder",
        message: "this is an comment",
        createdAt: new Date("8 Jan 2024").getTime(),
        parent: 4,
    },
];

let counts = 0;
let comments = null;

let commentDetails = {};

let connections = {};

export const getComments = () => {
    if (comments) {
        return { comments, commentDetails, connections, counts };
    }

    commentDetails = {};
    connections = {};
    comments = [];

    commentsData.sort(
        (comment1, comment2) => comment1.createdAt - comment2.createdAt
    );

    commentsData.forEach((comment) => {
        const { id, parent } = comment;

        counts = Math.max(counts, id);

        commentDetails[id] = comment;

        if (parent) {
            if (!connections[parent]) {
                connections[parent] = [];
            }
            connections[parent].push(id);
        } else {
            comments.push(id);
        }
    });

    counts += 1;

    return getComments();
};

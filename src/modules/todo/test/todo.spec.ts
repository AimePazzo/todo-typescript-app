import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import  jwt  from "jsonwebtoken";
import app from "../../..";

chai.use(chaiHttp);

const router = () => chai.request(app);

describe("Todo API", () => {
    let todoId: any;
    const YOUR_TOKEN: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjRhOTMxZTNmNTg5OGQ0ZTY3YmU5NCIsImlhdCI6MTcxMzc5NzUzMSwiZXhwIjoxNzEzODAxMTMxfQ.WrmOV9-PRcqahgn2QAzIKB9nzx-lSd6UvRRk58-iR_8";

    describe("Create Todo", () => {
        it("should create a new todo", async () => {
           
                const todoData = {
                    // userId:"user_id",
                    title: "New Todo"
                };

                const response = await router()
                    .post("/api/todo/create-todo")
                    .set("Authorization", `Bearer ${YOUR_TOKEN}`)
                    .send(todoData);

                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(response.body).to.have.property("data");
                expect(response.body.data).to.have.property("title", todoData.title);
                todoId = response.body.data._id;
           
        });
    });

    describe("Get Todo List", () => {
        it("should get a list of todos", async () => {
           
                const response = await router()
                    .get("/api/todo/get-todo-list")
                    .set("Authorization", `Bearer ${YOUR_TOKEN}`);

                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(response.body).to.have.property("data");
                expect(response.body.data).to.be.a("array");
           
        });
    });

    describe("Update Todo", () => {
        it("should update a todo", async () => {
           
                const updatedTitle = "Updated Todo Title";

                const response = await router()
                    .put(`/api/todo/update-todo/${todoId}`)
                    .set("Authorization", `Bearer ${YOUR_TOKEN}`)
                    .send({ title: updatedTitle });

                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(response.body).to.have.property("data");
                expect(response.body.data).to.have.property("title", updatedTitle);
           
        });

        it("should turn 404 when id not found", async () => {
           
                const updatedTitle = "Updated Todo Title";
                const todoId =""
                const response = await router()
                    .put(`/api/todo/update-todo/${todoId}`)
                    .set("Authorization", `Bearer ${YOUR_TOKEN}`)
                    .send({ title: updatedTitle });

                    expect(response).to.have.status(404);
                    expect(response.body).to.be.a("object");
                    // expect(response.body).to.have.key("error");
           
        });
    });

    describe("getTodoByUserId", () => {
        it("should return a list of todo items for a user", async () => {
            const userId = "user_id"; 
            const response = await router()
                .get(`/api/todo/get-todo`)
                .set("Authorization", `Bearer ${YOUR_TOKEN}`)
                .send({ userId });

            expect(response).to.have.status(200);
            expect(response.body).to.be.a("object");
            expect(response.body).to.have.property("data");
            
        });

    });


    describe("Delete Todo", () => {
        it("should delete a todo", async () => {
           
                const response = await router()
                    .delete(`/api/todo/delete-todo/${todoId}`)
                    .set("Authorization", `Bearer ${YOUR_TOKEN}`);

                expect(response).to.have.status(200);
                expect(response.body).to.be.a("object");
                expect(response.body).to.have.property("message", "Task deleted successfully");
           
        });
    });


    describe("Token Check Middleware", () => {
        it("should return status 401 if no token provided", async () => {
            const response = await router()
                .get("/api/todo/get-todo");

            expect(response).to.have.status(401);
            expect(response.body).to.be.a("object");
            expect(response.body).to.have.property("error", "No token provided");
        });

        it("should return status 401 if token is invalid", async () => {
            const token = "invalid_token";
            const response = await router()
                .get(`/api/todo/get-todo`)
                .set('Authorization', `Bearer ${token}`);
    
            expect(response).to.have.status(401);
            expect(response.body).to.be.a("object");
            expect(response.body).to.have.property("error", "Failed to authenticate token");
        });
    });
});

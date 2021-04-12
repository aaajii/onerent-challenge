import React, { Component } from "react";
// import Search from 'react-search';

class Lookup extends Component {
    constructor(props) {
        super(props);
        this.search = React.createRef();
        this.state = {
            isFetching: true,
            users: [],
            properties: [],
            suggestions: [],
        };
    }

    submitHandler = (event) => {
        event.preventDefault();
        const searchInput = this.search.current.value;

        if (searchInput.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
      query{
        search(searchInput:"${searchInput}"){
          users{
            firstName
            lastName
            properties{
              street
              city
              state
              zip
              rent
            }
          }
          properties{
            street
            city
            state
            zip
            rent
          }
        }
      }
      `,
        };

        fetch("http://localhost:8000/graphql", {
            method: "POST",
            body: JSON.stringify(requestBody),
            variables: {},
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                if (res.status !== 200 && res.status !== 201) {
                    console.log(res);
                    throw new Error("Failed!");
                }
                return res.json();
            })
            .then((resData) => {
                this.setState({
                    isFetching: false,
                    users: resData.data.search.users,
                    properties: resData.data.search.properties,
                });

                console.log(this.state);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <form className="search-form" onSubmit={this.submitHandler}>
                    <h2 className="label-wrapper">
                        <label className="label__lg">
                            Onerent Code Challenge: Search User and Properties
                        </label>
                    </h2>
                    <div className="form-control">
                        <input
                            id="search"
                            className="input input__lg"
                            name="text"
                            type="search"
                            ref={this.search}
                        />
                    </div>
                    <div className="form-actions">
                        <button
                            className="btn btn__primary btn__lg"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
                <div>
                    {this.state.users.map((user) => {
                        return (
                            <div>
                                <h2 id="list-heading">
                                    {user.lastName}, {user.firstName}
                                </h2>
                                <p>
                                    <h2>Properties: </h2>
                                    {user.properties.map((property, index) => {
                                        return (
                                            <ul className="todo-list stack-large stack-exception"
                                            aria-labelledby="list-heading">
                                                <h3>Property #{index + 1} </h3>
                                                <li>{property.street}</li>
                                                <li>{property.city}</li>
                                                <li>{property.state}</li>
                                                <li>{property.zip}</li>
                                                <li>{property.rent}</li>
                                            </ul>
                                        );
                                    })}
                                </p>
                            </div>
                        );
                    })}
                    {this.state.properties.map((property) => {
                        return (
                            <p>
                                <h3>Properties found:</h3>
                                <ul>
                                    <li>{property.street}</li>
                                    <li>{property.city}</li>
                                    <li>{property.state}</li>
                                    <li>{property.zip}</li>
                                    <li>{property.rent}</li>
                                </ul>
                            </p>
                        );
                    })}
                    <p>{this.state.isFetching ? "Fetching Data..." : ""}</p>
                </div>
            </div>
        );
    }
}

export default Lookup;

import React, { useState, useEffect } from "react";
import "./Search.scss";
import ImageNoFound from "../../../assets/png/avatar.png";
import { Search, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { size } from "lodash";
import { useQuery } from "@apollo/client";
import { SEARCH_USERS } from "../../../gql/user";

export default function SearchUser() {
    const [search, setSearch] = useState(null);
    const [results, setResults] = useState([]);
    const { data, loading } = useQuery(SEARCH_USERS, {
        variables: { search },
    });

    useEffect(() => {
        if (size(data?.searchUser) > 0) {
            const users = [];
            data.searchUser.forEach((user, index) => {
                users.push({
                    key: index,
                    title: user.name,
                    username: user.username,
                    avatar: user.avatar,
                });
            });
            setResults(users);
        } else {
            setResults([]);
        }
    }, [data]);

    const onChange = (event) => {
        if (event.target.value) setSearch(event.target.value);
        else setSearch(null);
    };

    const handleResult = () => {
        setSearch(null);
        setResults([]);
    };

    return (
        <Search
            className="search-users"
            fluid
            input={{ icon: "search", iconPosition: "left" }}
            placeholder="Buscar un usuario"
            loading={loading}
            value={search || ""}
            results={results}
            resultRenderer={(event) => <ResultSearch data={event} />}
            onSearchChange={onChange}
            onResultSelect={handleResult}
        />
    );
}

function ResultSearch(props) {
    const { data } = props;

    return (
        <Link className="search-users__item" to={`/${data.username}`}>
            <Image src={data.avatar || ImageNoFound} />
            <div>
                <p>{data.title}</p>
                <p>{data.username}</p>
            </div>
        </Link>
    );
}

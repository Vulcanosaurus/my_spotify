import React from 'react';
import {Link} from "react-router-dom";

class Artists extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('http://localhost/dev_env/spotify_project/spotify_react/src/api.php')
            .then(res => res.json())
            .then(
                (result) => {
                    // console.log(result);
                    let test = result.artists_full
                    this.setState({
                        isLoaded: true,
                        items: test
                    });
                },
                // Remarque : il est important de traiter les erreurs ici
                // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
                // des exceptions provenant de réels bugs du composant.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        // console.log(items)
        let test = [];
        Object.keys(items).forEach(function (key) {
            test.push(items[key])
        })
        let path = "Artist_detail/";
        if (error) {
            return <div>Erreur : {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <div className="album-container">
                    {test.map((key) =>
                        <div className="albumList">
                            <Link className="album" to={path + key['id']}>
                                <p>
                                    {key["name"]}
                                </p>
                            </Link>

                        </div>
                    )}
                </div>
            );
        }
    }
}

export default Artists;
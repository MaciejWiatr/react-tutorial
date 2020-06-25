import React from "react";
import pet, { Photo } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

class Details extends React.Component<RouteComponentProps<{ id: string }>> {
    public state = {
        loading: true,
        showModal: false,
        name: "",
        animal: "",
        location: "",
        description: "",
        media: [] as Photo[],
        url: "",
        breed: "",
    };

    public componentDidMount() {
        if (!this.props.id) {
            navigate("/");
            return;
        }
        pet.animal(+this.props.id).then(({ animal }) => {
            this.setState({
                url: animal.url,
                name: animal.name,
                animal: animal.type,
                location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
                description: animal.description,
                media: animal.photos,
                breed: animal.breeds.primary,
                loading: false,
            });
        }, console.error);
    }

    public toggleModal = () =>
        this.setState({ showModal: !this.state.showModal });
    public adopt = () => navigate(this.state.url);
    public render() {
        if (this.state.loading) {
            return <h1>Loading ... </h1>;
        }
        const {
            animal,
            breed,
            location,
            description,
            name,
            media,
            showModal,
        } = this.state;

        return (
            <div className="details">
                <Carousel media={media} />
                <div>
                    <h1>{name}</h1>
                    <h2>{`${animal} - ${breed}  - ${location}`}</h2>
                    <ThemeContext.Consumer>
                        {([theme]) => (
                            <button
                                onClick={this.toggleModal}
                                style={{ backgroundColor: theme }}
                            >
                                Adopt {name}
                            </button>
                        )}
                    </ThemeContext.Consumer>

                    <p>{description}</p>

                    {showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {name}?</h1>
                                <div className="buttons">
                                    <button onClick={this.adopt}>Yes</button>
                                    <button onClick={this.toggleModal}>
                                        No, I am a monster
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    ) : null}
                </div>
            </div>
        );
    }
}

export default function DetailsWithErrorBoundary(
    props: RouteComponentProps<{ id: string }>
) {
    return (
        <ErrorBoundary>
            <Details {...props} />
        </ErrorBoundary>
    );
}

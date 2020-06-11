import React from "react";

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            active: 0,
        };
        this.handleIndexClick = (event) => {
            this.setState({
                active: +event.target.dataset.index,
            });
        };
    }

    static getDerivedStateFromProps({ media }) {
        let photos = ["http://placecorgi.com/600/600"];
        if (media.length) {
            photos = media.map(({ large }) => large);
        }
        return { photos };
    }

    render() {
        const { photos, active } = this.state;

        return (
            <div className="carousel">
                <img src={photos[active]} alt="animal"></img>
                <div className="carousel-smaller">
                    {photos.map((photo, index) => (
                        // eslint-disable-next-line
                        <img
                            alt="animal thumbnail"
                            key={photo}
                            onClick={this.handleIndexClick}
                            data-index={index}
                            src={photo}
                            className={index === active ? "active" : ""}
                        ></img>
                    ))}
                </div>
            </div>
        );
    }
}

export default Carousel;

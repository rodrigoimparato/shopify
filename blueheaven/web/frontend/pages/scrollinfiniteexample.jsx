import InfiniteScroll from "react-infinite-scroll-component";
import { useState } from "react";

const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

function ScrollInfiniteExample() {

    const [items, setItems] = useState(Array.from({ length: 30 }));
    const theArray = [1,2,3,4,5]

    const fetchMoreData = () => {
        setTimeout(() => {
            setItems([
                ...items, ...theArray
            ]);
        }, 1500);
    };

    return (
        <div>
            <h1>demo: react-infinite-scroll-component <br /></h1>
            <hr />
            <InfiniteScroll
                dataLength={ items.length }
                next={ fetchMoreData }
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {items.map((i, index) => (
                    <div style={style} key={index}>
                        div - #{index}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default ScrollInfiniteExample;


import { useParams } from "react-router-dom";
import AllNavSections from "../AllNavSections";
// import ProductViewLeft from "./ProductViewLeft";
import ViewSpecificProduct from "./ViewSpecificProduct";

const ProductView = () => {
    const {id}=useParams();
    return (
        <div>
            <AllNavSections/>
            <ViewSpecificProduct  id={id}/>
        </div>
    );
};

export default ProductView;
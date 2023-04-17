import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function FirstForm() {
    const [passProduct, setPassProduct] = useState({
        name: "",
        packageId: "",
        category: "",
        manufacturer: "",
        status: "",
        productSFDetailDtos: [

        ],
        prices: [

        ]
    })

    const navigate = useNavigate();

    const [colors, setColors] = useState([])

    const [sizes, setSizes] = useState([])

    const generateProduct = () => {
        navigate("/secondForm", { state: { passProduct, colors, sizes } })
        clearAllData();
    }

    function handleInput(e) {
        setPassProduct({ ...passProduct, [e.target.name]: e.target.value });
    }

    function handleSizes(e) {
        setSizes(e.target.value.split(","))
    }

    function handleColors(e) {
        setColors(e.target.value.split(","))
    }

    function clearAllData() {
        setPassProduct({
            ...passProduct,
            name: "",
            packageId: "",
            category: "",
            manufacturer: "",
            status: "",
            productSFDetail: [
            ],
            prices: [

            ]
        })
        setColors([]);
        setSizes([]);
    }

    return (
        <>
            <div style={{ textAlign: "center" }}>
                <p>Name</p>
                <input type="text" name="name" value={passProduct.name} onChange={handleInput}></input>
                <br />
                <br/>
                <p>Package ID</p>
                <input type="text" name="packageId" value={passProduct.packageId} onChange={handleInput}></input>
                <br />
                <br/>
                <p>Category</p>
                <input type="text" name="category" value={passProduct.category} onChange={handleInput}></input>
                <br />
                <br/>
                <p>Manufacturer</p>
                <input type="text" name="manufacturer" value={passProduct.manufacturer} onChange={handleInput}></input>
                <br />
                <br/>
                <p>Sizes</p>
                <input type="text" name="sizes" value={sizes} onChange={handleSizes}></input>
                <br />
                <br/>
                <p>Colors</p>
                <input type="text" name="colors" value={colors} onChange={handleColors}></input>
                <br />
                <br />
                <button onClick={generateProduct}>Generate</button>
                <br />
                <br />
                <button onClick={clearAllData}>Clear</button>
            </div>
        </>
    )
}
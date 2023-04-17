
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PRODUCT_URL } from '../URLS/url';

export default function ThirdForm() {
    const { state } = useLocation();
    const [product, setProduct] = useState({});
    const [priceList, setPriceList] = useState([]);
    const [priceObj, setPriceObj] = useState({
        priceId: 0,
        fromQuantity: 0,
        toQuantity: 0,
        price: 0
    });
    const [tempPricesList, setTempPricesList] = useState([]);
    let isStop = false;
    const url = PRODUCT_URL;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isStop) {
            setProduct(state.product);
        }

        return () => {
            isStop = true;
        };
    }, [])

    const resetAllData = () => {
        setTempPricesList([]);
        setPriceObj({
            priceId: 0,
            fromQuantity: 0,
            toQuantity: 0,
            price: 0
        })
        setPriceList([])
        setProduct({ ...product, prices: [] })
    }

    const handleInputPriceObj = (e) => {
        setPriceObj({ ...priceObj, [e.target.name]: Number(e.target.value) })
    }

    const addToTempPricesList = () => {
        if (tempPricesList.length === 0) {
            if (priceObj.toQuantity === 0) {
                priceObj.toQuantity = 999999999;
                priceObj.priceId = tempPricesList.length
                // setPriceObj({...priceObj})
                setTempPricesList([...tempPricesList, priceObj]);
                setPriceObj({
                    ...priceObj,
                    fromQuantity: 0,
                    toQuantity: 0,
                    price: 0
                })
            } else {
                priceObj.priceId = tempPricesList.length
                // setPriceObj({...priceObj})
                setTempPricesList([...tempPricesList, priceObj]);
                setPriceObj({
                    ...priceObj,
                    fromQuantity: 0,
                    toQuantity: 0,
                    price: 0
                })
            }
        } else {
            if (priceObj.toQuantity === 0) {
                priceObj.toQuantity = 999999999;
                priceObj.priceId = tempPricesList.length
                // setPriceObj({...priceObj})
                setTempPricesList([...tempPricesList, priceObj]);
                setPriceObj({
                    ...priceObj,
                    fromQuantity: 0,
                    toQuantity: 0,
                    price: 0
                })
            } else {
                priceObj.priceId = tempPricesList.length
                // setPriceObj({...priceObj})
                setTempPricesList([...tempPricesList, priceObj]);
                setPriceObj({
                    ...priceObj,
                    fromQuantity: 0,
                    toQuantity: 0,
                    price: 0
                })
            }
        }
    }

    const removeThisPrice = (e) => {
        console.log(e.target.value)
        console.log(tempPricesList.filter((ele) => ele.priceId !== e.target.value))
    }

    const editThisPrice = (e) => {

    }

    const addPriceObjToOfficialPricesList = (e) => {
        setPriceList(tempPricesList)
    }

    const createPricesListForCurrentProduct = (e) => {
        setProduct({ ...product, prices: priceList })
    }

    const saveProductToDatabase = async (e) => {
        await axios({
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            url: `${url}/new-product/`,
            method: "POST",
            data: product
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })

        resetAllData();
        navigate(`/firstForm`);
    }

    const showPricesTable = (e) => {
        return (
            <div>
                <tr>
                    <th>
                        Price ID
                    </th>
                    <th>
                        Price
                    </th>
                    <th>
                        From-quantity
                    </th>
                    <th>
                        To-quantity
                    </th>
                    <th>
                        Action
                    </th>
                </tr>
                {tempPricesList.map((element, index) => (
                    <tr>
                        <td>
                            <h5>{element.priceId}</h5>
                        </td>
                        <td>
                            <h5>{element.price}</h5>
                        </td>
                        <td>
                            <h5>{element.fromQuantity}</h5>
                        </td>
                        <td>
                            <h5>{element.toQuantity}</h5>
                        </td>
                        <td>
                            <button className='btn btn-primary' onClick={removeThisPrice} type="button" value={element.priceId}>Remove</button>
                            <button className='btn btn-primary ml-2' onClick={editThisPrice} type="button" value={element.priceId}>Edit</button>
                        </td>
                    </tr>
                ))}
            </div>
        )
    }

    const showCurrentProduct = (e) => {
        console.log(product)
    }

    const showCurrentTempPricesList = () => {
        console.log(tempPricesList);
    }

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ textAlign: 'center' }}>Add prices list for your product</h1>
            <button type='button' className='btn btn-danger mt-3' onClick={resetAllData}>Reset all data</button>
            <button type='button' className='btn btn-warning mt-3 ml-2' onClick={showCurrentProduct}>Show current product</button>
            <button type='button' className='btn btn-warning mt-3 ml-2' onClick={showCurrentTempPricesList}>Show current temp prices list</button>
            <hr />
            <h3 className='mt-3'>First, enter the from-quantity for your price discount limit</h3>
            <input className='mt-2' type='number' name='fromQuantity' onChange={handleInputPriceObj} />
            <h3 className='mt-5'>Second, enter the to-quantity for your price discount limit</h3>
            <input className='mt-2' type='number' name='toQuantity' onChange={handleInputPriceObj} />
            <h3 className='mt-5'>Finally, enter the price for discount limit</h3>
            <input className='mt-2' type='number' name='price' onChange={handleInputPriceObj} />
            <hr />
            <h2 className='mt-5'>When finishing the above information, create price object and add it to a temp product prices list. You can continue to add more price objects to current temp prices list</h2>
            <button type='button' onClick={addToTempPricesList} className='btn btn-success mt-2'>Create price object for prices list</button>
            <table className='prices-information mt-2'>
                {showPricesTable()}
            </table>
            <h2 className='mt-5'>Now, if this temp product prices list is done, you can press this button to finish current price object</h2>
            <button type='button' onClick={addPriceObjToOfficialPricesList} className='btn btn-success mt-2'>Set temp prices list to official prices list</button>
            <hr />
            <h2 className='mt-5'>This section is for finalizing your prices list of your product</h2>
            <button className='btn btn-success mt-2' type='button' onClick={createPricesListForCurrentProduct}>Create prices list for current product</button>
            <hr />
            <h2 className='mt-5'>Add this product to database</h2>
            <button className='btn btn-success mt-2' onClick={saveProductToDatabase} type='button'>Add product</button>
        </div>
    )
}
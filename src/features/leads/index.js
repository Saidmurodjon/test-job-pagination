import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLeadsContent, addNewBasket } from "./leadSlice";
import Pagination from "../../components/pagination/Pagination";
import Card from "../../components/cards/Index";
import Filter from "./components/Filter";

function Leads() {
  const { leads, filter } = useSelector((state) => state.leads);
  const [next, setNext] = useState({
    skip: 0,
    limit: 10,
  });
  const [order, setOrder] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    // setNext({ ...next, filter });
    dispatch(getLeadsContent({ next, filter }));
  }, [dispatch, next, filter]);
  const AddBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
  };
  useEffect(() => {
    dispatch(addNewBasket({ order }));
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);
  return (
    <>
      <div className="container mx-auto">
        <div className="">
          <h1>Lorem ipsum dolor sit amet.</h1>
          <Filter />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {leads?.map((elem) => (
            <Card value={elem} AddBasket={AddBasket} />
          ))}
        </div>
        <div className="flex">
          <Pagination
            currentPage={next.skip}
            setPage={(elem) => setNext({ ...next, skip: elem })}
          />
        </div>
      </div>
    </>
  );
}

export default Leads;

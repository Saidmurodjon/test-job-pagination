import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/input/InputText";
import SelectBox from "../../../components/input/SelectBox";
import { filter } from "../leadSlice";
import axios from "axios";
const INITIAL_LEAD_OBJ = {
  search: "",
  category: "",
};

function Filter() {
  const dispatch = useDispatch();
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);
  const [categories, setCategories] = useState([]);
  const updateFormValue = (e) => {
    setLeadObj({ ...leadObj, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    dispatch(filter({ leadObj }));
  }, [leadObj]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_API}products/categories`
      );
      if (response.status === 200) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);
  return (
    <>
      <div className="m-2 flex ">
        <div className="">
          <InputText
            type="text"
            defaultValue={leadObj.search}
            name={"search"}
            updateType="search"
            containerStyle="mt-4"
            labelTitle="Search"
            updateFormValue={updateFormValue}
          />
        </div>
        <div className="">
          <SelectBox
            labelTitle="Select"
            defaultValue={leadObj.category}
            name="category"
            placeholder={"Category"}
            options={categories}
            containerStyle="mt-4"
            updateFormValue={updateFormValue}
          />
        </div>
      </div>
    </>
  );
}

export default Filter;

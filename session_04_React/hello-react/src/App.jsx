// Import Tier 1
import { LifecycleDemo, BadCounter, GoodCounter, FlowDemo } from "./components/Tier1_Flow";

// Import Tier 2
import { SimpleVariables, ConditionalAndLists } from "./components/Tier2_Variables";

// Import Tier 3
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import UserCard from "./components/UserCard";
import Footer from "./components/Footer";

// Import Tier 4
import NumberState from "./components/NumberState";
import AdvancedForm from "./components/AdvancedForm";
import MultipleStates from "./components/MultipleStates";

// Import Tier 5
import ClickEvents from "./components/ClickEvents";
import InputEvents from "./components/InputEvents";
import KeyboardEvents from "./components/KeyboardEvents";
import FormEvents from "./components/FormEvents";

// Import Tier 6 (Quản lý mảng và CRUD động mới)
import ListBasics from "./components/ListBasics";
import CreateItem from "./components/CreateItem";
import DeleteItem from "./components/DeleteItem";
import UpdateItem from "./components/UpdateItem";

function App() {
    return (
        <div>
            <Header />

            <h2>--- TIER 1 ---</h2>
            <LifecycleDemo />
            <BadCounter />
            <GoodCounter />
            <FlowDemo />

            <h2>--- TIER 2 ---</h2>
            <SimpleVariables />
            <ConditionalAndLists />

            <h2>--- TIER 3 ---</h2>
            <ProductCard name="iPhone 15" price="25.000.000" image="https://via.placeholder.com/150" />
            <UserCard name="Minh" email="minh@gmail.com" avatar="https://i.pravatar.cc/150" />

            <h2>--- TIER 4 ---</h2>
            <NumberState />
            <AdvancedForm />
            <MultipleStates />

            <h2>--- TIER 5 ---</h2>
            <ClickEvents />
            <InputEvents />
            <KeyboardEvents />
            <FormEvents />

            <h2>--- TIER 6 ---</h2>
            <ListBasics />
            <CreateItem />
            <DeleteItem />
            <UpdateItem />

            <Footer />
        </div>
    );
}

export default App;
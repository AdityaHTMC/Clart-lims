/* eslint-disable no-unused-vars */
import { Fragment } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./screen/auth/Login";
import DashboardContainer from "./screen/Home";
import CategoryPage from "./screen/category";
import SubCategoryPage from "./screen/sub-category";
import SalesOrders from "./screen/Orders";
import SalesTransaction from "./screen/transaction";
import CreateCoupons from "./screen/create-coupon";
import CreatePage from "./screen/create-pages";
import CreateMenu from "./screen/create-menu";
import CreateUser from "./screen/create-user";
import CreateVendors from "./screen/create-vendor";
import Profile from "./screen/Profile";
import AddProduct from "./screen/AddUnitList";
import ListCoupons from "./screen/coupon-list";
import ListPages from "./screen/pages-list";
import MenuList from "./screen/menu-list";

import CommonLayout from "./component/common/common-layout";
import { useAuthContext } from "./helper/AuthProvider";
import ProductEdit from "./screen/ProductEdit";
import BannerList from "./screen/BannerList";
import BrandList from "./screen/BrandList";
import VarityList from "./screen/VarityList";
import PackSize from "./screen/PackSize";
import FaqList from "./screen/FaqList";
import UnitSize from "./screen/UnitSize";
import BagType from "./screen/BagType";
import CmsList from "./screen/CmsList";
import CurrencyList from "./screen/CurrencyList";
import Location from "./screen/Location";
import Categories from "./screen/Categories";
import SmsSettings from "./screen/SmsSettings";
import SubscribeEmail from "./screen/SubscribeEmail";
import SubCategoryList from "./screen/SubCategoryList";
import StateList from "./screen/StateList";
import CityList from "./screen/CityList";
import UserList from "./screen/UserList";
import OrderList from "./screen/OrderList";
import OrderDetails from "./screen/OrderDetails";
import AddCoupon from "./screen/AddCoupon";
import PromoCodeList from "./screen/PromoCodeList";
import VendorList from "./screen/VendorList";
import EventList from "./screen/EventList";
import AddEvent from "./screen/AddEvent";
import FeaturedSection from "./screen/FeaturedSection";
import EditFeatured from "./screen/EditFeatured";
import NotFound from "./screen/NotFound";
import DeliveryBoyList from "./screen/DeliveryBoyList";
import AddDeliveryBoy from "./screen/AddDeliveryBoy";
import EditDeliveryBoy from "./screen/EditDeliveryBoy";
import StoreSetting from "./screen/StoreSetting";
import PermissionManagement from "./screen/permission_management";
import RoleManagement from "./screen/RoleManagement";
import UserManagement from "./screen/UserManagement";
import UnitList from "./screen/UnitList";
import AddUnitList from "./screen/AddUnitList";
import CollectionList from "./screen/CollectionCenter.jsx/CollectionList";
import LabList from "./screen/LabCenter/LabList";
import AddLab from "./screen/LabCenter/AddLab";
import AddCollectionList from "./screen/CollectionCenter.jsx/AddCollectionList";
import PhlebotomistList from "./screen/Phlebotomist/PhlebotomistList";
import AddPhlebotomist from "./screen/Phlebotomist/AddPhlebotomist";
import BreadList from "./Master/BreedMaster/BreadList";
import AddBread from "./Master/BreedMaster/AddBread";
import CustomerList from "./screen/Customers/CustomerList";
import AddCustomer from "./screen/Customers/AddCustomer";

function App() {
  const { initialLoading } = useAuthContext();

  if (initialLoading) {
    return null;
  }

  return (
    <Fragment>
      <Routes>
        <Route element={<CommonLayout />}>
          <Route path="/dashboard" element={<DashboardContainer />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product/sub-category" element={<SubCategoryPage />} />
          <Route path="/unit-list" element={<UnitList />} />
          <Route path="/product-edit/:id" element={<ProductEdit />} />
          <Route path="/banner-list" element={<BannerList />} />
          <Route path="/brand-master" element={<BrandList />} />
          <Route path="/variety-master" element={<VarityList />} />
          <Route path="/pack-size" element={<PackSize />} />
          <Route path="/unit-master" element={<UnitSize />} />
          <Route path="/bag-type" element={<BagType />} />
          <Route path="/cms" element={<CmsList />} />
          <Route path="/currency" element={<CurrencyList />} />
          <Route path="/country" element={<Location />} />
          <Route path="/faqs" element={<FaqList />} />
          <Route path="/sms-settings" element={<SmsSettings />} />
          <Route path="/subscribed-email" element={<SubscribeEmail />} />
          <Route path="/subcategory-List/:id" element={<SubCategoryList />} />
          <Route path="/state-list/:id" element={<StateList />} />
          <Route path="/city-list/:id" element={<CityList />} />
          <Route path="/customer" element={<UserList />} />
          <Route path="/lab-list" element={<LabList />} />
          <Route path="/add-lab" element={<AddLab />} />
          <Route path="/collection-center-list" element={<CollectionList />} />
          <Route path="/add-connection" element={<AddCollectionList />} />
          
          <Route path="/phlebotomist-list" element={<PhlebotomistList />} />


          <Route path="/add-phlebotomist" element={<AddPhlebotomist />} />

          <Route path="/customers-list" element={<CustomerList />} />

          <Route path="/add-customer" element={<AddCustomer />} />

          {/* master */}

          <Route path="/breed-management" element={<BreadList />} />
          <Route path="/add-breed" element={<AddBread />} />

          <Route path="/all-orders" element={<OrderList status="" />} />
          <Route
            path="/pending-orders"
            element={<OrderList status="Pending" />}
          />
          <Route
            path="/cancelled-orders"
            element={<OrderList status="Cancelled" />}
          />
          <Route
            path="/confirmed-orders"
            element={<OrderList status="Confirmed" />}
          />
          <Route
            path="/processing-orders"
            element={<OrderList status="Processing" />}
          />
          <Route
            path="/on-the-way-orders"
            element={<OrderList status="On The Way" />}
          />
          <Route
            path="/delivered-orders"
            element={<OrderList status="Delivered" />}
          />
          <Route
            path="/pickup-orders"
            element={<OrderList status="Pickup" />}
          />
          <Route
            path="/completed-orders"
            element={<OrderList status="Completed" />}
          />

          <Route path="/orders-details/:id" element={<OrderDetails />} />
          <Route path="/addcoupons" element={<AddCoupon />} />
          <Route path="/promo-code" element={<PromoCodeList />} />

          <Route path="/fulfillment-center" element={<VendorList />} />
          <Route path="/event-news" element={<EventList />} />

          <Route path="/featured-section" element={<FeaturedSection />} />

          <Route path="/edit-section/:id" element={<EditFeatured />} />

          <Route path="/addEvent" element={<AddEvent />} />

          <Route path="/delivery-boys" element={<DeliveryBoyList />} />

          <Route path="/add-delivery-boys" element={<AddDeliveryBoy />} />

          <Route path="/editDelivery/:id" element={<EditDeliveryBoy />} />
          <Route path="/store-settings" element={<StoreSetting />} />

          <Route path="/permission-management" element={<PermissionManagement />} />

          <Route path="/role-management" element={<RoleManagement />} />

          <Route path="/user-management" element={<UserManagement />} />

          <Route path="/sales/orders" element={<SalesOrders />} />
          <Route path="/sales/transactions" element={<SalesTransaction />} />
          <Route path="/create-coupons" element={<CreateCoupons />} />
          <Route path="/coupons-list" element={<ListCoupons />} />
          <Route path="/create-pages" element={<CreatePage />} />
          <Route path="/pages-list" element={<ListPages />} />
          <Route path="/create-menus" element={<CreateMenu />} />
          <Route path="/menu-list" element={<MenuList />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/create-vendor" element={<CreateVendors />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-products" element={<AddUnitList />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </Fragment>
  );
}

export default App;

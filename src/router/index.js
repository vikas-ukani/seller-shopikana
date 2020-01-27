import Vue from "vue";
import Router from "vue-router";
// const store = () => import('@store/index')
import store from "../store"; // your vuex store
// import Login from '../views/admin/auth/LoginComponent'
import ForgotPassword from "../views/admin/auth/ForgotPasswordComponent";
import ChangePassword from "../views/admin/auth/ChangePasswordComponent";

// Views
import Profile from "../views/admin/auth/Profile";
/** Masters Components */

import Products from "../views/admin/Masters/Products";
import AddProduct from "../views/admin/Masters/Products/AddProduct";
import EditProduct from "../views/admin/Masters/Products/EditProduct";


/** Orders */
import Orders1 from "../views/Widgets";
import Orders from "../views/admin/Masters/Orders";
import ManageOrders from "../views/admin/Masters/Orders/ManageOrders";

Vue.use(Router);

// Containers
const DefaultContainer = () => import("@/containers/DefaultContainer");

// Views
const Dashboard1 = () => import("@/views/DashboardComponent");

// Views - Pages
import Login from '@/views/admin/auth/LoginComponent'
// const Login = () => import("@/views/admin/auth/LoginComponent");

Vue.use(Router);

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/dashboard");
};
const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next("/login");
};

export default new Router({
  mode: "hash", // https://router.vuejs.org/api/#mode   //  hash   // history
  // base: process.env.BASE_URL,
  // linkActiveClass: 'open active',
  // scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      name: "Home",
      component: DefaultContainer,
      beforeEnter: ifAuthenticated,
      children: [
        // {
        //   path: 'dashboard-1',
        //   name: 'Dashboard',
        //   component: Dashboard,
        //   beforeEnter: ifAuthenticated,
        // },
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard1
        },
        {
          path: "/products", // route_prefix +
          name: "Products",
          component: Products,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/orders", // route_prefix +
          name: "orders",
          component: Orders,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/order/manage-orders", // route_prefix +
          name: "Manage Orders",
          component: ManageOrders,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/orders1", // route_prefix +
          name: "orders1",
          component: Orders1,
          beforeEnter: ifAuthenticated
        },

        {
          path: "/add-product", // route_prefix +
          name: "AddProducts",
          component: AddProduct,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/edit-product/:id", // route_prefix +
          name: "EditProducts",
          component: EditProduct,
          beforeEnter: ifAuthenticated
        },
        {
          path: "/profile",
          name: "profile",
          component: Profile,
          beforeEnter: ifAuthenticated
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: ForgotPassword,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "/change-password/:email/:token",
      name: "change-password",
      component: ChangePassword,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: "*", // set default fou7te
      component: null,
      redirect: "/dashboard",
      beforeEnter: ifAuthenticated
    }
  ]
});

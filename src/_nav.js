export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-speedometer",
      sequence: 1,
      badge: {
        // variant: 'primary',
        // text: 'NEW'
      }
    },
    {
      name: "Products",
      url: "/products",
      icon: "icon-directions",
      sequence: 14
    },
    {
      name: "Orders",
      url: "/orders",
      icon: "icon-cart",
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      name: "Payments",
      url: "/payments",
      icon: "icon-speedometer",
      badge: {
        variant: 'warning',
        text: 'NEW'
      }
    },
  ]
};

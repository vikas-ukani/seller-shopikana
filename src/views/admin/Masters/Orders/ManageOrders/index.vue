<template>
  <div class="animated fadeIn">
    <div class>
      <page-header
        :is_delete_all="true"
        :is_show_add_button="true"
        :is_show_model="false"
        :is_show_serach="true"
        :search="search"
        :selected_ids="selectedIds"
        :title="$route.name"
        :titleCounter="totalCount"
        add_route="/add-product"
      />

      <!-- <div class="breadcrumb col-md-12 col-sm-12 col-xs-10 mt-2 mb-2 p-2"> -->
      <!-- <div class="font-weight-bold">
           <button
            :class="{ 'tab-content' :  currentTab == item.name }"
            class="text-capitalize btn"
            @click="currentTab = item.name "
            v-for="(item, index) in statusTabs"
            :key="index"
          >{{ item.name }}</button>
      </div>-->
      <!-- </div> -->

      <!-- :add_route="$route.path + '-add'" -->
      <!-- <pre>{{lists}}</pre> -->
      <div class="card card-body">
        <ul class="nav nav-tabs">
          <li class="nav-item" v-for="(item, index) in statusTabs" :key="index">
            <a
              @click="currentTab = item.id "
              class="nav-link"
              :class="{ 'active' :  currentTab === item.id }"
            >{{ item.name }}</a>
          </li>
        </ul>
        <!-- <pre>{{currentTab}}</pre> -->

        <table class="table mt-4" v-if="lists && lists.length">
          <!-- table-hover table-responsive-sm col-lg-12 col-md-12 col-sm-12 col-xs-12 -->
          <thead>
            <tr>
              <th nowrap>
                <b-form-checkbox
                  @change="selectedAllRecords(!allSelectedData)"
                  v-model="allSelectedData"
                >#</b-form-checkbox>
              </th>
              <th class="text-capitalize no-wrap" style="width: 308px;">Product</th>
              <th class="text-capitalize">Quantity.</th>
              <!-- <th class="text-capitalize col-1">Order NO.</th> -->
              <th class="text-capitalize">Order Date</th>
              <th class="text-capitalize">Order expected Date</th>
              <th class="text-capitalize">Payment Method</th>
              <!-- <th class="text-capitalize col-1">Payment Date</th> -->
              <!-- <th class="text-capitalize">Payment Type</th> -->
              <th class="text-capitalize">Total Payment Amount</th>
              <!-- <th class="text-capitalize">Stock</th> -->
              <!-- <th class="text-capitalize">Category</th> -->
              <th class="text-capitalize">Status</th>
              <th class="text-capitalize">Action</th>
            </tr>
          </thead>
          <tbody v-if="lists && lists.length">
            <tr :key="index" v-for="(list, index) in lists">
              <td>
                <!-- <pre>{{list}}</pre> -->
                <b-form-checkbox
                  @change="selectCheckBox(list.id, !list.is_selected  )"
                  v-model="list.is_selected"
                >{{ ((page * limit) - (limit - (index + 1)) ) }}</b-form-checkbox>
              </td>
              <td colspan="2" class="pr-0 py-1">
                <table class="w-100">
                  <tr class>
                    <td class="td-product border-0 px-0 py-2" style="width: 292px;">
                      <div data-v-12f0b410 class="d-flex">
                        <!-- style="min-height: 120px; min-width: 120px; max-height: 120px; max-width: 120px" -->
                        <img
                          class="fill rounded flex-shrink-0"
                          height="120"
                          width="120"
                          v-bind:alt="list.product_details.name"
                          v-bind:src="list.product_details.image"
                          v-if="list.product_details  && list.product_details.image  "
                        />

                        <div
                          data-v-12f0b410
                          class="product-info ml-2 font-sm d-flex flex-column justify-content-between"
                          style="width: 200px; min-width: 200px;"
                        >
                          <p
                            class="font-weight-bold"
                            v-if="list.product_details && list.product_details.name"
                          >{{list.product_details.name}}</p>
                          <div>
                            <p v-if="list.product_details.size">Size: {{list.product_details.size}}</p>
                            <p
                              v-if="list.product_details.color_name"
                            >Color: {{list.product_details.color_name}}</p>
                            <p
                              v-if="list.product_details.sale_price"
                            >Price: {{list.product_details.sale_price}}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td class="td-product pl-0 border-0">1</td>
                  </tr>
                </table>
              </td>

              <td>
                <small class="font-bold">{{ (list.order_date ) || '-' }}</small>
                <!-- | 'formatDate' -->
              </td>
              <td>
                <small class="font-bold">{{ list.expected_date || '-' }}</small>
              </td>
              <td>
                <small class="font-bold">{{ (list.transaction_type )|| '-' }}</small>
              </td>
              <td>
                <small class="font-bold">{{ (list.total_amount )|| '-' }}</small>
              </td>
              <td>
                <small class="font-bold">{{ (list.status )|| '-' }}</small>
              </td>

              <!-- <td>
                <small class="font-bold">{{ list.category.name || '-' }}</small>
              </td>-->
              <!-- <td>
                <span @click="statusChange('is_active', !list.is_active, list.id)" class="p-0 m-0">
                  <switches
                    color="green"
                    theme="bulma"
                    type-bold="false"
                    v-bind:label="(!!list.is_active) ? 'Active' : 'Deactive'"
                    v-model="list.is_active"
                  />
                </span>
              </td>-->
              <td>
                <!-- <router-link
                  :to="'/edit-product/' + list.id"
                  class="text-primary p-0"
                  v-b-tooltip.hover.left="'Edit ' + list.name"
                >
                  <i class="fa fa-edit fa-2x fa-2x" />
                </router-link>-->
                <!--              <a-->
                <!--                @click="getDetails(list.id)"      -->
                <!--                class="text-primary p-0"-->
                <!--                v-b-tooltip.hover.left="'Edit ' + list.name"-->
                <!--              >-->
                <!--                <i class="fa fa-edit fa-2x"/>-->
                <!--              </a>-->

                <!-- <a
                  @click="deleteConfirmation(list)"
                  class="link text-danger p-0 ml-1"
                  v-b-tooltip.hover.left="'Delete ' + list.name"
                >
                  <i class="fa fa-trash fa-2x" />
                </a>-->

                <!-- <br /> -->

                <!-- <pre> {{ statusTabs }} - {{ OrderStatusTabs }}</pre> -->
                <!-- Example single danger button -->
                <div class="dropdown">
                  <a
                    class="btn btn-behance btn-sm dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >Actions</a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <!-- <a class="dropdown-item" href="#"> -->
                    <li class="m-2">
                      <button
                        v-if="OrderStatusTabs.PENDING === currentTab"
                        class="btn btn-success btn-sm m-1"
                        @click="approveAnOrder(list)"
                      >Approve 1</button>
                      <button
                        v-if="OrderStatusTabs.PENDING === currentTab"
                        class="btn btn-danger btn-sm m-1"
                        @click="statusChange('status', OrderStatusTabs.REJECTED, list.id)"
                      >Reject</button>

                      <button
                        v-if="OrderStatusTabs.REJECTED === currentTab"
                        class="btn btn-info btn-sm m-1"
                        @click="statusChange('status', OrderStatusTabs.PENDING, list.id)"
                      >Move to Pending</button>
                    </li>
                    <!-- </a> -->
                    <!-- <li class="m-2"> -->
                    <a v-if="0" class="dropdown-item" href="#">Request for Shipment</a>
                    <!-- </li> -->
                    <!-- <li class="m-2"> -->
                    <a v-if="0" class="dropdown-item" href="#">Generate a Lable</a>
                    <!-- </li> -->

                    <a v-if="0" class="dropdown-item" href="#">Generate a Mainfest</a>
                    <!-- <a class="dropdown-item" href="#">One more item</a> -->
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="col-md-12">
          <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4 pull-left">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1">
                  <b>Limit:</b>
                </span>
              </div>
              <select
                @change="changePageLimits($event)"
                class="form-control col-md-4 col-lg-4 col-sm-4"
                v-model="limit"
              >
                <option
                  :key="index"
                  :value="limit.value"
                  v-for="(limit, index) in pageLimits"
                  v-show="(totalCount >=  limit.value)"
                >
                  {{limit.key}}
                  <!-- -- {{totalCount }} - {{ limit.value}} -->
                </option>
                <option :value="totalCount">
                  All
                  <!-- {{ totalCount }} -- {{ limit.value}} -->
                </option>
              </select>
            </div>
          </span>
          <span class="col-xl-4 col-sm-4 col-md-4 col-xs-4">
            Showing
            <span class="text-primary">{{ ((page * limit) - (limit - 1) ) }}</span>
            to
            <b>
              {{ (totalCount >= ((page * limit)) ? ((page * limit)) : totalCount ) }}
              <!-- {{ limit >= totalCount ? totalCount : limit }} -->
            </b> of
            <span class="text-primary">{{ totalCount }}</span>
            entries
          </span>
          <div class="pull-right">
            <b-pagination
              :per-page="limit"
              :total-rows="totalCount"
              aria-controls="my-table"
              class="col-xl-4 col-sm-4 col-md-4 col-xs-4"
              v-model="page"
            />
          </div>
        </div>
      </div>
      <div
        class="no-data-found mt-5 col-md-12 display-4 text-center text-danger"
        v-if="!lists || lists.length == 0"
      >
        <i class="fa fa-warning mr-3"></i>No Data Found
      </div>
    </div>
  </div>
</template>

<script>
import Services from "@/Services/apiServices";
import { Constants } from "@/constants";
import { ApiCollections, baseURL, LIMITS } from "@/config/config";
import Switches from "vue-switches";
import PageHeader from "@/components/custom/PageHeader";
import VueUploadMultipleImage from "vue-upload-multiple-image";

export default {
  name: "orders",
  components: {
    Switches,
    VueUploadMultipleImage,
    PageHeader
  },
  data: function() {
    return {
      currentTab: null,
      statusTabs: [],
      OrderStatusTabs: Constants.OrderStatusTabs,

      baseURL: baseURL,
      allSelectedData: false,
      selectedIds: [],
      category_list: [],
      pageLimits: [],
      detail: {
        name: "",
        category_id: "",
        price: "",
        size: "",
        color: "",
        description: "",
        is_active: true,
        images: []
      },
      search: PageHeader.data.search,
      showModal: false,
      totalCount: 0,
      page: 1,
      limit: 10,
      lists: []
    };
  },
  mounted() {
    this.getCategoryList(); // categories_list
  },
  beforeMount() {
    _.each(Constants.OrderStatusTabs, (key, val) => {
      this.statusTabs.push({ name: key.replace(/_/g, " "), id: val });
    });
    /** set default to dashboard */
    this.currentTab = this.setDefaultTab();

    this.limit = LIMITS[0].value;
    this.pageLimits = LIMITS;
    this.getAllList();
  },
  computed: {},
  // computed
  methods: {
    setDefaultTab() {
      return _.first(this.statusTabs).id;
    },
    toDataURL(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    },

    async deleteAllFn() {
      var request = {
        ids: this.selectedIds
      };

      this.$swal
        .fire({
          title: "Are you sure?",
          text:
            "You want to delete selected(" +
            this.selectedIds.length +
            ") record!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(async result => {
          if (result.value) {
            if (this.selectedIds && this.selectedIds.length) {
              let res = await Services.call(
                ApiCollections.orders_delete_multiple
              ).deleteMany(request);

              /**
               * Check Response
               */
              if (res && res.success && res.success == true) {
                this.$Progress.finish();
                this.selectedIds = [];
                this.allSelectedData = false;
                this.getAllList();

                Services.notify("s", res.message);
              } else {
                this.$Progress.fail();
                Services.notify("e", res.message);
              }
            }
          }
        });
    },

    async getCategoryList() {
      let res = await Services.call(ApiCollections.categories_list).post({
        is_parent: true,
        is_active: true
      });

      if (res && res.success === true) {
        this.category_list = res.data.list;
      } else {
        this.category_list = [];
      }
    },

    changePageLimits(event) {
      this.limit = event.target.value;
      this.selectedIds = [];
      this.allSelectedData = false;
      this.getAllList();
    },
    /**
     * Set to All Check Box true or false
     */
    selectedAllRecords(allSelectedData) {
      var selIds = [];
      if (allSelectedData === true) {
        this.$_.map(this.lists, function(list) {
          list.is_selected = allSelectedData;
          selIds.push(list.id);
        });
        this.selectedIds = selIds;
      } else {
        this.$_.map(this.lists, function(list) {
          list.is_selected = allSelectedData;
        });
        this.selectedIds = [];
      }
    },

    /**
     * Select single record check box
     */
    selectCheckBox(id, value) {
      if (id) {
        let index = this.$_.findIndex(this.lists, { id: id });
        let data = this.$_.findWhere(this.lists, { id: id });

        if (!data) {
          Services.notify("e", "Records not found");
          return false;
        }
        /** set list check box to check or uncheck */
        data.is_selected = value;
        /** refresh selected object */
        this.lists.splice(index, 1, data);
        if (value == false) {
          /** remove id from all selected ids array */
          if (this.selectedIds && this.selectedIds.length) {
            this.selectedIds = _.reject(this.selectedIds, function(num) {
              return num == id;
            });
          }
          this.allSelectedData = false;
        } else if (value == true) {
          this.selectedIds.push(id);

          /** check for all selected count and total count */
          if (
            this.selectedIds &&
            this.selectedIds.length == this.lists.length
          ) {
            this.allSelectedData = true;
          }
        }
      } else {
        Services.notify("e", "Records not found");
        return false;
      }
    },

    /** get details by id */
    async getDetails(id) {
      let res = await Services.call(ApiCollections.orders_get).getOne(id);

      if (res && res.success && res.success === true) {
        this.detail = res.data;
        let imageUrls = res.data.image;

        if (imageUrls && imageUrls.length > 0) {
          this.detail.images = [];
          imageUrls.forEach((imageUrl, index) => {
            this.detail.images[index] = {
              name: `image${index}.png`,
              // name: "vrushik1.png",
              path: imageUrl,
              highlight: 1,
              default: 1
            };

            // this.toDataURL(imageUrl, dataUrl => {
            //   let imageDataIs = {
            //     name: `image${index}.png`,
            //     path: dataUrl,
            //     highlight: 1,
            //     default: 1
            //   };
            //   this.detail.images.push(imageDataIs);
            // });
          });
        }

        //         this.detail.images.map(imageUrl => () {
        //           toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
        //   console.log('RESULT:', dataUrl)
        // }),
        //         });

        this.$Progress.finish();
        // Services.notify("s", res.message);
        this.showModal = true;
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }
    },

    /**
     * Delete Confirmation
     */
    deleteConfirmation(list) {
      //   this.$swal("Hello Vue world!!!");
      // title: "",
      //
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You want to delete " + list.name + " record!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            this.deleteRecord(list);
          }
        });
      /** if yes then call false */
      //   this.deleteRecord(id);
    },

    /** delete record from list by id  */
    async deleteRecord(list) {
      if (!list.id) {
        Services.notify("e", "Record details not found");
        return false;
      }
      let res = await Services.call(ApiCollections.orders_delete).delete(
        list.id
      );
      if (res && res.success && res.success == true) {
        var index = this.$_.findIndex(this.lists, { id: list.id });

        /** stop loader */
        this.$Progress.finish();
        if (index === -1) {
          Services.notify("e", "Record not found in listing");
          return false;
        }
        this.lists.splice(index, 1);
        this.totalCount--;
        this.$swal.fire(
          "Deleted!",
          list.name + " record has been deleted.",
          "success"
        );
      } else {
        Services.notify("e", res.message);
      }
    },
    clearAllData() {
      this.detail = {
        name: "",
        category_id: "",
        price: "",
        size: "",
        color: "",
        description: "",
        is_active: true,
        images: []
      };
      // this.detail.images = [];
    },
    handleFileUpload(e) {
      let input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = e => {
          this.detail.image = e.target.result;
          this.selectedFile = input.files[0];
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    async submitData() {
      let index;
      let formData = new FormData();

      if (this.detail.images && this.detail.images.length) {
        /** start  */
        for (let i = 0; i < this.detail.images.length; i++) {
          let file = this.detail.images[i];
          index = file.path.search("data:image");
          if (index >= 0) {
            let arr = file.path.split(",");

            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            formData.append(
              "images[]",
              new File([u8arr], file.name, { type: mime })
            );
          }
        }
      }

      formData.append("name", this.detail.name);
      formData.append("category_id", this.detail.category_id);
      formData.append("price", this.detail.price);
      formData.append("size", this.detail.size);
      formData.append("color", this.detail.color);
      formData.append("description", this.detail.description);
      formData.append("is_active", this.detail.is_active);

      this.$Progress.start();
      if (this.detail && this.detail.id) {
        let apiObject = this.$_.clone(ApiCollections.orders_update);
        apiObject.url += this.detail.id;

        let res = await Services.call(apiObject).post(formData);

        /** set update data  */
        if (res && res.success && res.success === true) {
          index = this.$_.findIndex(this.lists, {
            id: this.detail.id
          });

          /** stop loader */
          this.$Progress.finish();
          if (index === -1) {
            Services.notify("e", "Record not found in listing");
            return false;
          }
          // this.lists.slice(index, 1, this.$_.clone(res.data));

          this.lists[index] = this.$_.clone(res.data);

          Services.notify("s", res.message);
          this.showModal = false;
          this.detail = {};
        } else {
          this.$Progress.fail();
          Services.notify("e", res.message);
        }
      } else {
        /** create data */
        let res = await Services.call(ApiCollections.orders_create).post(
          formData
        );
        /** set data  */
        if (res && res.success && res.success === true) {
          this.lists.unshift(res.data);
          this.totalCount++;
          this.$Progress.finish();
          Services.notify("s", res.message);
          this.showModal = false;
          this.detail = {};
        } else {
          this.$Progress.fail();
          Services.notify("e", res.message);
        }
      }
    },
    clearSearch(value) {},
    pageChangeFn(page = 1) {
      this.selectedIds = [];
      this.allSelectedData = false;
      this.getAllList();
    },
    /**
     * Get All Listing
     */
    async getAllList(search = "") {
      /** make common request */
      var request = {
        page: this.page,
        limit: this.limit
        // relation: ["category", "stock_inventory"],
        // stock_inventory_list: [
        //   "product_id",
        //   "images",
        //   "sale_price",
        //   "stock_available"
        // ],
        // category_list: ["id", "name"]
      };
      if (this.currentTab) {
        request.status = this.currentTab;
      }

      /** if search found then send to request */
      if (search && search.length > 0) {
        request.search = search;
      } else if (this.search && this.search.length > 0) {
        request.search = this.search;
      }

      /** start progress here */
      this.$Progress.start();

      let res = await Services.call(
        // ApiCollections.training_activities_listing
        ApiCollections.orders_list
      ).post(request);

      /** check error or success response */
      if (res && res.success && res.success == true) {
        this.lists = res.data.list;

        this.totalCount = parseInt(res.data.count);

        if (this.lists && this.lists.length) {
          /** to set defalt check box is false */
          this.$_.each(this.lists, function(value, key) {
            value.is_selected = false;
          });
        }

        this.$Progress.finish();
      } else {
        this.lists = [];
        this.totalCount = 0;
        this.$Progress.fail();
        // Services.notify("e", res.message);
      }
    },

    async approveAnOrder(order) {
      console.log("order => ", order);

      let res = await Services.call(ApiCollections.shiporder_make_order).post(
        order
      );

      console.log("Request ", res);
    },

    async statusChange(key, value, id) {
      console.log("Stauts change to => ", key, value, id);

      var request = {
        id: id
      };
      if (key == "is_active") {
        request.is_active = value;
      } else if (key == "status") {
        request.status = value;
      }

      let res = await Services.call(
        ApiCollections.orders_update_status_change
      ).post(request);

      /** set update data  */
      if (res && res.success && res.success == true) {
        var index = this.$_.findIndex(this.lists, { id: id });

        /** stop loader */
        this.$Progress.finish();
        if (index == -1) {
          Services.notify("e", "Record not found in listing");
          return false;
        }

        /** check if status not to current status then remove from list */
        if (key === "status" && this.currentTab !== res.data.status) {
          // res.data
          this.lists.splice(index, 1);
          this.totalCount--;
        }

        Services.notify("s", res.message);
      } else {
        this.$Progress.fail();
        Services.notify("e", res.message);
      }
    },
    getImageLoaded(url) {
      return baseURL + url;
      return false;
      // ApiCollections.getImage.url += url;
      let requestData = ApiCollections.getImage;
      let mainURL = requestData.url + url;
      requestData.url = mainURL;
      // console.log(
      //   "Check Url ",
      //   requestData
      //   // mainURL
      //   // await Services.call(ApiCollections.getImage).get()
      // );

      // return await Services.call(requestData).get();
    }
  },
  watch: {
    currentTab: function(val) {
      this.getAllList();
    },
    // "detail.name"(newVal) {
    //     if (newVal) {
    //         this.detail.code = this.$_.clone(
    //             newVal.replace(/ /g, "_").toUpperCase()
    //         );
    //     }
    // },
    page: function(val) {
      this.pageChangeFn(parseInt(val));
    }
  }
};
</script>

<style scope="">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
     * The following styles are auto-applied to elements with
     * transition="modal" when their visibility is toggled
     * by Vue.js.
     *
     * You can easily play with the modal transition by editing
     * these styles.
     */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>

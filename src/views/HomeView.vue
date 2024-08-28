<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { ProductService } from '@/service/ProductService'
import AutoComplete from 'primevue/autocomplete';
import Calendar from 'primevue/calendar';
import CascadeSelect from 'primevue/cascadeselect';
import ColorPicker from 'primevue/colorpicker';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import PickList from 'primevue/picklist';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

const value = ref("");
const items = ref([]);
const dates = ref();
const selectedCity = ref();
const countries = ref([
  {
    name: 'Australia',
    code: 'AU',
    states: [
      {
        name: 'New South Wales',
        cities: [
          { cname: 'Sydney', code: 'A-SY' },
          { cname: 'Newcastle', code: 'A-NE' },
          { cname: 'Wollongong', code: 'A-WO' }
        ]
      },
      {
        name: 'Queensland',
        cities: [
          { cname: 'Brisbane', code: 'A-BR' },
          { cname: 'Townsville', code: 'A-TO' }
        ]
      }
    ]
  },
  {
    name: 'Canada',
    code: 'CA',
    states: [
      {
        name: 'Quebec',
        cities: [
          { cname: 'Montreal', code: 'C-MO' },
          { cname: 'Quebec City', code: 'C-QU' }
        ]
      },
      {
        name: 'Ontario',
        cities: [
          { cname: 'Ottawa', code: 'C-OT' },
          { cname: 'Toronto', code: 'C-TO' }
        ]
      }
    ]
  },
  {
    name: 'United States',
    code: 'US',
    states: [
      {
        name: 'California',
        cities: [
          { cname: 'Los Angeles', code: 'US-LA' },
          { cname: 'San Diego', code: 'US-SD' },
          { cname: 'San Francisco', code: 'US-SF' }
        ]
      },
      {
        name: 'Florida',
        cities: [
          { cname: 'Jacksonville', code: 'US-JA' },
          { cname: 'Miami', code: 'US-MI' },
          { cname: 'Tampa', code: 'US-TA' },
          { cname: 'Orlando', code: 'US-OR' }
        ]
      },
      {
        name: 'Texas',
        cities: [
          { cname: 'Austin', code: 'US-AU' },
          { cname: 'Dallas', code: 'US-DA' },
          { cname: 'Houston', code: 'US-HO' }
        ]
      }
    ]
  }
]);
const hexColor = ref();
const rgbColor = ref();
const hsbColor = ref();
const weathers = ref([]);
const titles = ref([
  {
    title: '測量站編號',
    field: 'stationId'
  },
  {
    title: '測量站名稱',
    field: 'stationName'
  },
  {
    title: '測量站歸屬',
    field: 'stationAttribute'
  },
  {
    title: '降雨量',
    field: 'obs',
  }
]);
const products = ref(null);

const search = (event) => {
  items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}

const weatherData = axios.get('https://opendata.cwb.gov.tw/api/v1/rest/datastore/C-B0025-001', {
  params: {
    Authorization: 'CWA-208ADA4E-95CF-4D80-AB14-0CD2E7B74077',
  }
})

const monthChangeEvent = () => {
  alert(123)
}

onMounted(async () => {
  ProductService.getProductsSmall().then((data) => (products.value = [data, []]));
  let response = await weatherData;
  let resData = response.data.records.location;
  resData = resData.map(result => ({
    stationId: result.station.StationID,
    stationName: result.station.StationName,
    stationAttribute: result.station.StationAttribute,
    obs: result.stationObsTimes.stationObsTime
  }))
  resData.forEach(item => {
    item.obs = (item.obs.pop()).weatherElements.Precipitation
  });
  weathers.value = resData
})

</script>

<template>
  <main>
    <div class="container">
      <Button>123</Button>
      <p>autoCompelete - 自動filter</p>
      <AutoComplete v-model="value" :suggestions="items" @complete="search" />
      <p>datePicker - 日期選擇器</p>
      <Calendar @month-change="monthChangeEvent" v-model="dates" showIcon>
        <template #header>
          <Button>測試插槽塞按鈕</Button>
        </template>
      </Calendar>
      <p>CascadeSelect - 階層式選單</p>
      <CascadeSelect v-model="selectedCity" :options="countries" optionLabel="cname" optionGroupLabel="name"
        :optionGroupChildren="['states', 'cities']" style="min-width: 14rem;" placeholder="Select a City" />
      <p>顏色選擇器</p>
      <span class="mr-2" style="color: #060640;">hex</span>
      <ColorPicker class="mb-2" v-model="hexColor" format="hex" />
      <p>{{ hexColor }}</p>
      <span class="mr-2" style="color: #060640;">rgb</span>
      <ColorPicker class="mb-2" v-model="rgbColor" format="rgb" />
      <p>{{ rgbColor }}</p>
      <span class="mr-2" style="color: #060640;">hsb</span>
      <ColorPicker class="mb-2" v-model="hsbColor" format="hsb" />
      <p>{{ hsbColor }}</p>
      <p>Datatable</p>
      <DataTable :value="weathers" tableStyle="min-width: 50rem" paginator :rows="10">
        <Column v-for="item in titles" sortable style="width: 25%" :field="item.field" :header="item.title"></Column>
      </DataTable>
      <p>PickList</p>
      <PickList v-model="products" listStyle="height:342px" dataKey="id" breakpoint="1400px">
        <template #sourceheader> Available </template>
        <template #targetheader> Selected </template>
        <template #item="slotProps">
          <div class="flex flex-wrap p-2 align-items-center gap-3">
            <img class="w-4rem shadow-2 flex-shrink-0 border-round"
              :src="'https://primefaces.org/cdn/primevue/images/product/' + slotProps.item.image"
              :alt="slotProps.item.name" />
            <div class="flex-1 flex flex-column gap-2">
              <span class="font-bold">{{ slotProps.item.name }}</span>
              <div class="flex align-items-center gap-2">
                <i class="pi pi-tag text-sm"></i>
                <span>{{ slotProps.item.category }}</span>
              </div>
            </div>
            <span class="font-bold text-900">$ {{ slotProps.item.price }}</span>
          </div>
        </template>
      </PickList>
      <p>Splitter</p>
      <Splitter style="height: 300px" class="mb-5">
        <SplitterPanel class="flex align-items-center justify-content-center"> Panel 1 </SplitterPanel>
        <SplitterPanel class="flex align-items-center justify-content-center"> Panel 2 </SplitterPanel>
      </Splitter>
      <i class="fa-light fa-chevron-down"></i>
    </div>
  </main>
</template>
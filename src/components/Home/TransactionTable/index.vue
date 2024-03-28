<script setup lang='ts'>
import { NTag } from 'naive-ui';
import { ref, onMounted, h } from 'vue'

let data = ref()
let columns = [{
    title: 'Order_No',
    key: 'order_no'
},
{
    title: 'Price',
    key: 'price'
},
{
    title: 'Status',
    key: 'status',
    render(row:any) {
        return h(
            NTag,
            {
                type: row.status === 'pending' ? 'error' : 'success'
            },
            { default: () => row.status }
        )
    }
}]

const fetchData = () => {
    // transactionList().then(res => {
    //     data.value = res.data.items.slice(0, 8)
    // })
    let res = {
        "code": 20000,
        "data": {
            "total": 20,
            "items": [
                {
                    "order_no": "8bD81e5E-5cA7-9f44-CfA4-1D6da754C9B7",
                    "timestamp": 1487660188100,
                    "username": "Larry Lewis",
                    "price": 10435.4,
                    "status": "pending"
                },
                {
                    "order_no": "43235Dc0-dc1D-18C3-9A4F-dc2CFADC4C52",
                    "timestamp": 1487660188100,
                    "username": "Larry Wilson",
                    "price": 1066,
                    "status": "success"
                },
                {
                    "order_no": "FBA2Da99-f744-F2BB-21b8-cc5139b9DF99",
                    "timestamp": 1487660188100,
                    "username": "Robert Thomas",
                    "price": 4207.78,
                    "status": "success"
                },
                {
                    "order_no": "EcDf8beE-cbF6-471a-C922-3e7AA2b14f89",
                    "timestamp": 1487660188100,
                    "username": "Eric Thompson",
                    "price": 5262.7,
                    "status": "pending"
                },
                {
                    "order_no": "1C82de13-68Ff-DDCc-D6cC-b5be5bdFDAeA",
                    "timestamp": 1487660188100,
                    "username": "Kimberly Martin",
                    "price": 7654.85,
                    "status": "success"
                },
                {
                    "order_no": "Fa0874FA-6D8e-295A-9b7F-CdA3A8C4CB1A",
                    "timestamp": 1487660188100,
                    "username": "Lisa Robinson",
                    "price": 9177,
                    "status": "pending"
                },
                {
                    "order_no": "6cefcBbe-fb3e-ccBC-dBEe-5F9eAAaA4B71",
                    "timestamp": 1487660188100,
                    "username": "Anthony Johnson",
                    "price": 3586.83,
                    "status": "pending"
                },
                {
                    "order_no": "ED9324Fe-2B42-2dEf-082C-C4777C1B3A06",
                    "timestamp": 1487660188100,
                    "username": "Christopher Garcia",
                    "price": 9359.86,
                    "status": "success"
                },
                {
                    "order_no": "e1B24693-33A8-Edbd-21c8-13BAC6E6EAcD",
                    "timestamp": 1487660188100,
                    "username": "Dorothy Jones",
                    "price": 3667.2,
                    "status": "pending"
                },
                {
                    "order_no": "eec20415-7FF6-4B8B-BE99-3dACECE787db",
                    "timestamp": 1487660188100,
                    "username": "Laura Young",
                    "price": 2101.36,
                    "status": "pending"
                },
                {
                    "order_no": "ED853eF6-4Ad4-E4C5-eff7-6cddE3feAbaB",
                    "timestamp": 1487660188100,
                    "username": "Timothy Johnson",
                    "price": 8879.4,
                    "status": "success"
                },
                {
                    "order_no": "F7E42db6-BbDc-c336-c5ea-c5a98EFeFebD",
                    "timestamp": 1487660188100,
                    "username": "Helen Davis",
                    "price": 11087.63,
                    "status": "pending"
                },
                {
                    "order_no": "dD4edB3E-4cB3-1DAc-C9Ec-A3cA218Cd6d6",
                    "timestamp": 1487660188100,
                    "username": "Kevin Gonzalez",
                    "price": 2388,
                    "status": "success"
                },
                {
                    "order_no": "36A23c21-9741-Cfe2-A19b-569b278CD6d9",
                    "timestamp": 1487660188100,
                    "username": "Kevin Johnson",
                    "price": 10139.14,
                    "status": "success"
                },
                {
                    "order_no": "48D357DC-f03B-aC9f-CADc-b9c4cE9e11AA",
                    "timestamp": 1487660188100,
                    "username": "Gary Hernandez",
                    "price": 13549.3,
                    "status": "pending"
                },
                {
                    "order_no": "6C25Db51-72d4-4a6a-b85a-3DbCCea8bAbE",
                    "timestamp": 1487660188100,
                    "username": "Brian Jones",
                    "price": 1106,
                    "status": "pending"
                },
                {
                    "order_no": "2Af498cc-AAbB-efDa-1dD7-e56c18FfEbef",
                    "timestamp": 1487660188100,
                    "username": "Betty Jones",
                    "price": 11555,
                    "status": "success"
                },
                {
                    "order_no": "b7aafe72-eb8A-5dbb-DECc-cd5FBc1dd7EE",
                    "timestamp": 1487660188100,
                    "username": "Christopher Hernandez",
                    "price": 3547.22,
                    "status": "pending"
                },
                {
                    "order_no": "BC8Ff9BC-B38A-9F73-cbc9-3eB2ee56Ff46",
                    "timestamp": 1487660188100,
                    "username": "Susan Jones",
                    "price": 3740,
                    "status": "pending"
                },
                {
                    "order_no": "847e1d44-27ea-fDb4-5e56-028C9F6Aa875",
                    "timestamp": 1487660188100,
                    "username": "Mary Brown",
                    "price": 12454.59,
                    "status": "success"
                }
            ]
        }
    }
    data.value = res.data.items.slice(0, 8)
}

onMounted(() => {
    fetchData()
})
</script>
<template>
    <n-data-table :columns="columns" :data="data" :pagination="false" :bordered="false" />
</template>
<style lang='scss' scoped></style>
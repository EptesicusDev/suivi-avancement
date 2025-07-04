<script setup>
import { onMounted, watch } from 'vue'
import ApexCharts from 'apexcharts'
import { useWorkshopStore } from '@/stores/workshops'
import { useElementSize } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const store = useWorkshopStore()
const chartConfig = {
    series: [],
    chart: {
        type: 'bar',
        height: 150,
        stacked: true,
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    dataLabels: {
        formatter: (val) => {
            return Math.round((val - 100 / numberOfItems) * 100000)
        }
    },
    plotOptions: {
        bar: {
        horizontal: true
        }
    },
    xaxis: {
        min: 0,
        max: 100,
        labels: {
            show: false,
        }
    },
    yaxis: {
        labels: {
            show: false,
        }
    },
    fill: {
        opacity: 1,
    },
    tooltip: {
        style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400
        },
        x: {
            show: false
        },
        y: {
            formatter: (val) => Math.round((val - 100 / numberOfItems) * 100000) + "%"
        }
    },
    colors: [
        '#52419A',
        '#649BD2',
        '#007A83',
        '#15B051',
        '#FAA928',
    ],
    legend: {
        position: 'top',
        horizontalAlign: 'center',
        colors: "#616161",
        fontSize: "12px",
        fontFamily: "inherit",
        fontWeight: 400
    }
}
const parent = useTemplateRef("parent")
const width = useElementSize(parent).width

var chart
var numberOfItems = 0

const refresh = () => {
    var series = []
    var names = []
    numberOfItems = 0
    for(var i = 1; i < 5; i++) {
        var name = eval("store.currentWorkshop.totIndicator" + i)
        if(names.includes(name) || name == "")
            continue
        names.push(name)
        numberOfItems++
    }
    names = []
    for(var i = 1; i < 5; i++) {
        var name = eval("store.currentWorkshop.totIndicator" + i)
        var value = eval("store.currentWorkshop.indicator" + i)
        if(names.includes(name) || name == "")
            continue
        names.push(name)
        series.push({
            name: name,
            group: "current",
            data: [100 / numberOfItems + value / 100000]
        })
    }
    chart.updateSeries(series)
}

onMounted(() => {
    chart = new ApexCharts(document.querySelector("#grouped-stacked-bar-chart"), chartConfig)
    chart.render()
    refresh()
})

watch(store, (o, n) => {
    refresh()
})

watch(width, () => {
    refresh()
})
</script>

<template>
    <div ref="parent" class="relative flex flex-col bg-clip-border text-gray-700 pt-6">
        <div class="pb-0">
            <div id="grouped-stacked-bar-chart"></div>
        </div>
    </div>
</template>
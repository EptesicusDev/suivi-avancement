<script setup>
import { onMounted, watch } from 'vue'
import ApexCharts from 'apexcharts'
import { useWorkshopStore } from '@/stores/workshops'
import { useElementSize } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { name } from '@vue/eslint-config-prettier/skip-formatting'

const store = useWorkshopStore()
const chartConfig = {
    series: [],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
    },
    stroke: {
        width: 1,
        colors: ['#fff']
    },
    dataLabels: {
        formatter: (val) => {
            return val / 1000 + 'K'
        }
    },
    plotOptions: {
        bar: {
        horizontal: true
        }
    },
    xaxis: {
        min: 0,
        max: 100
    },
    yaxis: {
        labels: {
            show: false,
        }
    },
    fill: {
        opacity: 1,
    },
    colors: [
        '#ffc9c9', '#ff6467',
        '#fee685', '#ffb900',
        '#d8fa99', '#9ae600',
        '#a4f4cf', '#00d492',
        '#a2f4fd', '#00d3f3'
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

const refresh = () => {
    var series = []
    var names = []
    /*for(var i = 1; i > 5; i++) {
        var name = eval("store.currentWorkshop.totIndicator" + i)
        var value = eval("store.currentWorkshop.indicator" + i)
        if(names.includes(name) || value == 0)
            continue
        names.push(name)
        series.push({
            name: name,
            data: [value]
        })
    }*/
    chart.updateSeries(series)
}

onMounted(() => {
    chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig)
    chart.render()
    refresh()
})

watch(store, (o, n) => {
    refresh()
})

watch(width, () => {
    //refresh()
})
</script>

<template>
    <div ref="parent" class="relative flex flex-col bg-clip-border text-gray-700 pt-6">
        <div class="pb-0">
            <div id="bar-chart"></div>
        </div>
    </div>
</template>
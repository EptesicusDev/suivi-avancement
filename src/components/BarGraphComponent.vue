<script setup>
import { onMounted, watch } from 'vue'
import ApexCharts from 'apexcharts'
import { useWorkshopStore } from '@/stores/workshops'
import { useElementSize } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const store = useWorkshopStore()

const chartConfig = {
    series: [
        {
            name: "Précédente mise à jour",
            data: [
                store.currentOldWorkshop.indicator1 * 100 / store.currentOldWorkshop.totIndicator1,
                store.currentOldWorkshop.indicator2 * 100 / store.currentOldWorkshop.totIndicator2,
                store.currentOldWorkshop.indicator3 * 100 / store.currentOldWorkshop.totIndicator3,
                store.currentOldWorkshop.indicator4 * 100 / store.currentOldWorkshop.totIndicator4
            ],
        }
    ],
    chart: {
        type: "bar",
        height: 300,
        toolbar: {
            show: false,
        },
        stacked: true,
        zoom: {
            enabled: true
        }
    },
    title: {
        show: "",
    },
    dataLabels: {
        enabled: true,
    },
    legend: {
        fontFamily: 'inherit'
    },
    colors: ["#020617", "oklch(54.6% 0.245 262.881)"],
    plotOptions: {
        bar: {
            columnWidth: "40%",
            borderRadius: 2
        },
    },
    xaxis: {
        axisTicks: {
            show: false,
        },
        axisBorder: {
            show: false,
        },
        labels: {
            style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
            },
        },
        categories: [
            "Caractérisation",
            "Assainissement",
            "Démantèlement",
            "Déclassement radio",
        ],
    },
    yaxis: {
        labels: {
            style: {
                colors: "#616161",
                fontSize: "12px",
                fontFamily: "inherit",
                fontWeight: 400,
            },
        },
        min: 0,
        max: 100,
        decimalsInFloat: 0
    },
    grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
            lines: {
                show: true,
            },
        },
        padding: {
            top: 5,
            right: 20,
        },
    },
    fill: {
        opacity: 0.8,
    },
    tooltip: {
        theme: "light",
        custom: (series, seriesIndex, dataPointIndex, w) => {
            var properties = Object.values(store.currentWorkshop)
            var value = properties[5 + 2 * series.dataPointIndex] // indicators start at [4] and there is the total of each indicator after each one
            var total = properties[6 + 2 * series.dataPointIndex]
            return "<span class=\"px-1\">" + Math.round(value * 100 / total) + "%</span>"
        }
    },
}

const formatToPercent = (value) => {
    return Math.ceil(Math.min(Math.max(value, 0), 100))
}

const refresh = () => {
    chart.updateSeries([
        {
            data: [
                formatToPercent(store.currentOldWorkshop.indicator1 * 100 / store.currentOldWorkshop.totIndicator1),
                formatToPercent(store.currentOldWorkshop.indicator2 * 100 / store.currentOldWorkshop.totIndicator2),
                formatToPercent(store.currentOldWorkshop.indicator3 * 100 / store.currentOldWorkshop.totIndicator3),
                formatToPercent(store.currentOldWorkshop.indicator4 * 100 / store.currentOldWorkshop.totIndicator4)
            ]
        }
    ])
    chart.appendSeries({
        name: "Dernière mise à jour",
        data: [
            formatToPercent(store.currentOldWorkshop.indicator1 * 100 / store.currentOldWorkshop.totIndicator1 - formatToPercent(store.currentOldWorkshop.indicator1 * 100 / store.currentOldWorkshop.totIndicator1)),
            formatToPercent(store.currentWorkshop.indicator2 * 100 / store.currentWorkshop.totIndicator2 - formatToPercent(store.currentOldWorkshop.indicator2 * 100 / store.currentOldWorkshop.totIndicator2)),
            formatToPercent(store.currentWorkshop.indicator3 * 100 / store.currentWorkshop.totIndicator3 - formatToPercent(store.currentOldWorkshop.indicator3 * 100 / store.currentOldWorkshop.totIndicator3)),
            formatToPercent(store.currentWorkshop.indicator4 * 100 / store.currentWorkshop.totIndicator4 - formatToPercent(store.currentOldWorkshop.indicator4 * 100 / store.currentOldWorkshop.totIndicator4))
        ]
    })
}
const parent = useTemplateRef("parent")
const width = useElementSize(parent).width

var chart

onMounted(() => {
    chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig)
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
    <div ref="parent" class="relative flex flex-col bg-clip-border text-gray-700">
        <div class="pb-0">
            <div id="bar-chart"></div>
        </div>
    </div>
</template>
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWorkshopStore = defineStore("workshops", () => {
  const workshops = ref([])
  const oldWorkshops = ref([])
  const zoneOptions = ref([])
  const currentWorkshop = ref(null)
  const currentOldWorkshop = ref(null)
  const agregationMode = ref(false)

  function toggleAgregationMode() {
    agregationMode.value = !agregationMode.value
  }

  function getAgregationMode() {
    return agregationMode.value
  }

  function mountWorkshop(toBeMountedWorkshop) {
    currentWorkshop.value = toBeMountedWorkshop
    oldWorkshops.value.forEach((workshop) => {
      if(workshop.workshop == toBeMountedWorkshop.workshop && (workshop.zone == "4" || workshop.project == "RCD")) {
        currentOldWorkshop.value = workshop
      }
    })
    var options = []
    workshops.value.forEach((workshop) => {
      if(workshop.workshop == toBeMountedWorkshop.workshop && !options.includes(workshop.zone))
        options.push(workshop.zone)
    })
    zoneOptions.value = options
  }

  function dismountWorkshop() {
    currentWorkshop.value = null
    currentOldWorkshop.value = null
  }

  function ysort() {
    workshops.value.sort((a, b) => b.y - a.y)
  }

  // for mounted workshop
  function changeZoneMountedWorkshop(zone) {
    var changed = false
    workshops.value.forEach((workshop) => {
      if(workshop.workshop == currentWorkshop.value.workshop && workshop.zone == zone) {
        currentWorkshop.value = workshop
        changed = true
      }
    })
    oldWorkshops.value.forEach((workshop) => {
      if(workshop.workshop == currentOldWorkshop.value.workshop && workshop.zone == zone) {
        currentOldWorkshop.value = workshop
      }
    })
    if(!changed)
      alert("Aucune donnée pour cet atelier en zone " + zone)
  }

  function addWorkshop(workshop) {
    workshops.value.push(workshop)
  }

  function addOldWorkshop(workshop) {
    oldWorkshops.value.push(workshop)
  }

  function getTotIndicator(workshop, idx) {
    switch(idx) {
      case 1:
        return workshop.totIndicator1
      case 2:
        return workshop.totIndicator2
      case 3:
        return workshop.totIndicator3
      case 4:
        return workshop.totIndicator4
      case 5:
        return workshop.totIndicator5
    }
  }

  function getCompletionIndicator(idx) {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if(workshop.zone != "4")
        return
      if(currentWorkshop.value != null) {
        if(!agregationMode.value && currentWorkshop.value.inb != workshop.inb)
          return
        if(agregationMode.value && currentWorkshop.value.sector != workshop.sector)
          return
      }
      sum += eval("workshop.indicator" + idx)
    })
    oldWorkshops.value.forEach((workshop) => {
      if(workshop.zone != "4")
        return
      if(currentWorkshop.value != null) {
        if(!agregationMode.value && currentWorkshop.value.inb != workshop.inb)
          return
        if(agregationMode.value && currentWorkshop.value.sector != workshop.sector)
          return
      }
      sumOld += parseInt(eval("workshop.totIndicator" + idx))
    })
    return { current: sum, old: sumOld }
  }

  function getTotalIndicator(idx) {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if(workshop.zone != "4")
        return
      if(currentWorkshop.value != null) {
        if(!agregationMode.value && currentWorkshop.value.inb != workshop.inb)
          return
        if(agregationMode.value && currentWorkshop.value.sector != workshop.sector)
          return
      }
      sum += parseInt(getTotIndicator(workshop, idx))
    })
    oldWorkshops.value.forEach((workshop) => {
      if(workshop.zone != "4")
        return
      if(currentWorkshop.value != null) {
        if(!agregationMode.value && currentWorkshop.value.inb != workshop.inb)
          return
        if(agregationMode.value && currentWorkshop.value.sector != workshop.sector)
          return
      }
      sumOld += parseInt(getTotIndicator(workshop, idx))
    })
    return { current: sum, old: sumOld }
  }

  return {
    workshops,
    oldWorkshops,
    currentWorkshop,
    currentOldWorkshop,
    zoneOptions,
    toggleAgregationMode,
    getAgregationMode,
    mountWorkshop,
    dismountWorkshop,
    ysort,
    changeZoneMountedWorkshop,
    addWorkshop,
    addOldWorkshop,
    getCompletionIndicator,
    getTotalIndicator
  }
})

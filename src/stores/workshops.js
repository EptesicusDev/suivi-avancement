import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useWorkshopStore = defineStore("workshops", () => {
  const workshops = ref([])
  const oldWorkshops = ref([])
  const zoneOptions = ref([])
  const currentWorkshop = ref(null)
  const currentOldWorkshop = ref(null)

  function mountWorkshop(toBeMountedWorkshop) {
    currentWorkshop.value = toBeMountedWorkshop
    oldWorkshops.value.forEach((workshop) => {
      if(workshop.workshop == toBeMountedWorkshop.workshop && workshop.zone == "4") {
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

  function getIndicator(workshop, idx) {
    switch(idx) {
      case 1:
        return workshop.indicator1
      case 2:
        return workshop.indicator2
      case 3:
        return workshop.indicator3
      case 4:
        return workshop.indicator4
      case 5:
        return workshop.indicator5
    }
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
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4") {
        sum += parseInt(getIndicator(workshop, idx))
      }
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4") {
        sumOld += parseInt(getIndicator(workshop, idx))
      }
    })
    return { current: sum, old: sumOld }
  }

  function getTotalIndicator(idx) {
    var sum = 0
    var sumOld = 0
    workshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
        sum += parseInt(getTotIndicator(workshop, idx))
    })
    oldWorkshops.value.forEach((workshop) => {
      if((currentWorkshop.value == null || workshop.inb == currentWorkshop.value.inb) && workshop.zone == "4")
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
    mountWorkshop,
    dismountWorkshop,
    changeZoneMountedWorkshop,
    addWorkshop,
    addOldWorkshop,
    getCompletionIndicator,
    getTotalIndicator
  }
})

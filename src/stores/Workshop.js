export default class Workshop {
    constructor(workshop, inb, projet, zone, end, indicator1, totIndicator1, indicator2, totIndicator2, indicator3, totIndicator3, indicator4, totIndicator4, indicator5, totIndicator5, updateDate, updateContent, x, y, image, color) {
        this.workshop = workshop
        this.inb = inb
        this.project = projet
        this.zone = zone
        this.end = end // fin de chantier
        this.indicator1 = indicator1 // caracterisation
        this.totIndicator1 = totIndicator1
        this.indicator2 = indicator2 // assainissement
        this.totIndicator2 = totIndicator2
        this.indicator3 = indicator3 // dementelement
        this.totIndicator3 = totIndicator3
        this.indicator4 = indicator4 // declassement radiologique
        this.totIndicator4 = totIndicator4
        this.indicator5 = indicator5
        this.totIndicator5 = totIndicator5
        this.updateDate = updateDate
        this.updateContent = updateContent
        this.image = image
        this.x = x
        this.y = y
        this.isSelected = false
        this.color = color
    }

    getGlobalCoordinates() {
        return { x: this.x, y: this.y }
    }
}
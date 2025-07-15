export default class Workshop {
    constructor(workshop, inb, sector, projet, zone, end, indicator1, totIndicator1, indicator2, totIndicator2, indicator3, totIndicator3, indicator4, totIndicator4, indicator5, totIndicator5, updateDate, updateContent, x, y, image, color) {
        this.workshop = workshop
        this.inb = inb
        this.sector = sector
        this.project = projet
        this.zone = zone
        this.end = end // fin de chantier
        this.indicator1 = parseInt(indicator1.replace("%", "")) // caracterisation
        this.totIndicator1 = totIndicator1
        this.indicator2 = parseInt(indicator2.replace("%", "")) // assainissement
        this.totIndicator2 = totIndicator2
        this.indicator3 = parseInt(indicator3.replace("%", "")) // dementelement
        this.totIndicator3 = totIndicator3
        this.indicator4 = parseInt(indicator4.replace("%", "")) // declassement radiologique
        this.totIndicator4 = totIndicator4
        this.indicator5 = parseInt(indicator5.replace("%", ""))
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
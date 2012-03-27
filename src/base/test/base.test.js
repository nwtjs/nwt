nwt.unit
.describe('Tests n.uuid')
.run(function(unit) {
	unit.notEqual(n.uuid(), n.uuid(), n.uuid())
})
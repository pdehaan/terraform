var should    = require('should')
var processor = require('../')

describe("less", function(){
  
  it("should exist", function(done){
    should.exist(processor)
    processor.should.have.property("process")
    done()
  })
  
  it("should have basic css file", function(done){
    processor.process("main.less", { root: __dirname + "/less-fixtures" }, function(error, info, body){
      should.not.exist(error)
      info.sourcePath.should.eql("main.less")
      info.sourceType.should.eql("less")
      info.outputPath.should.eql("main.css")
      info.outputType.should.eql("css")
      body.should.include("body{background:pink;}")
      done()
    })
  })
  
  it("should return errors if error found", function(done){
    processor.process("invalid.less", { root: __dirname + "/less-fixtures" }, function(error, info, body){
      should.not.exist(body)
      should.exist(error)
      error.should.have.property("name")
      error.should.have.property("message")
      error.should.have.property("stack")
      done()
    })
  })
  
})
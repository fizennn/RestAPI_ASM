var express = require("express");
var router = express.Router();

const Cars = require("../model/car");

router.get("/",async(req,res)=>{
  res.render('api')
})

router.get("/getAllCars",async(req,res)=>{
    try{
        const data = await Cars.find({});
        res.json({
          status: 200,
          messenger: "Thêm Thành Công !",
          data: data,
        });
    }catch(error){
        res.json({
            error: error.messenger,
        })
    }
});

router.post("/addCar",async(req,res)=>{
    try{
        const data = req.body;
        const newCar = new Cars({
            tenXe: data.tenXe,
            hangSX: data.hangSX,
            namSX: data.namSX,
            giaBan: data.giaBan,
            moTa: data.moTa,
        })

        const result = await newCar.save();
        if(result){
            res.json({
                data:result,
            });
        }else{
            res.json({
                messenger: "Them That Bai"
            })
        }
    }catch(error){
        res.json({
            messenger: "Loi Xay Ra",
            error: error.message,
        })
    }
});

router.put("/updateCar/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const data = req.body;
        const updateCar = await Cars.findByIdAndUpdate(id);
        if(updateCar){
            updateCar.tenXe = data.tenXe ?? updateCar.tenXe;
            updateCar.hangSX = data.hangSX ?? updateCar.hangSX;
            updateCar.namSX = data.namSX ?? updateCar.namSX;
            updateCar.giaBan = data.giaBan ?? updateCar.giaBan;
            updateCar.moTa = data.moTa ?? updateCar.moTa;
           result = await updateCar.save();
        }
        if (result) {
            res.json({
              status: 200,
              messenger: "Cập Nhật Thành Công",
              data: result,
            });
          } else {
            res.json({
              status: 400,
              messenger: "Cập Nhật Không Thành Công",
              data: [],
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
        status: 500,
        messenger: "Lỗi xảy ra",
        error: error.message,
        });
    }
});

router.delete("/deleteCar/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Cars.findByIdAndDelete(id);
  
      if (result) {
        res.json({
          status: 200,
          messenger: "Xóa Thành Công",
          data: result,
        });
      } else {
        res.json({
          status: 404,
          messenger: "Không tìm thấy xe cần xóa",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: 500,
        messenger: "Lỗi xảy ra khi xóa",
        error: error.message,
      });
    }
  });


module.exports = router;
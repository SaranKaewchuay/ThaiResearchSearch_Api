const express = require("express");
const cors = require("cors"); // เปิดการ Block Cors
const { sendRequestGetJson } = require("./function/service.js");

const http = require("http");

const fetch = require("node-fetch");
const app = express(); // ไว้ Config ค่าต่างๆ
const PORT = process.env.PORT || 8080;

app.use(express.json()); //รับ parameter Json
app.use(express.urlencoded({ extended: true })); //รับ parameter URL Encode

app.use(cors()); // เปิดการ Block Cors

// app.get("/getsolr/:keyword", async (req, res) => {
//   const keyword = req.params.keyword;
//   try {
//     const data = await sendRequestGetJson(
//       `http://127.0.0.1:8983/solr/test/select?q=_text_:` +
//         keyword +
//         `&q.op=OR&indent=true&facet=true&facet.field=author&facet.field=publisher&facet.mincount=1&wt=json`
//     );

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({
//       content: "",
//     });
//   }
// });

// app.get("/getbyid/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     const data = await sendRequestGetJson(
//       `http://localhost:8983/solr/research/select?q=_text_:` + id 
        
//     );

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({
//       content: "",
//     });
//   }
// });

// app.get("/getsolr", async (req, res) => {
//   const keyword = req.params.keyword;

//   try {
//     const data = await sendRequestGetJson(
//       // `http://localhost:8983/solr/research/select?indent=true&q.op=OR&q=*%3A*`
//       `http://localhost:8983/solr/research/select?indent=true&q.op=OR&q=*%3A*&rows=180&start=0`
//     );

//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({
//       content: "",
//     });
//   }
// });

//http://localhost:8983/solr/thai_research/select?indent=true&q.op=OR&q=_text_%3A*

app.get("/getsolr/:keyword", async (req, res) => {
  const keyword = req.params.keyword;
  try {
    const data = await sendRequestGetJson(
      // `http://localhost:8983/solr/thai_research/select?q=_text_:`  + keyword 
      //`http://localhost:8983/solr/thai_research/select?indent=true&q.op=OR&q=ProjectYearSubmit%3A`+  keyword  +`%or%OECD1%3A`+ keyword   + `*&rows=180&start=0`
      //`localhost:8983/solr/thai_research/select?fq=OECD1%3A`+ keyword +`&fq=ProjectObjective%3A`+ keyword +`&fq=ProjectYearSubmit%3A`+ keyword +`&indent=true&q.op=OR&q=ProjectNameTH%3A`+ keyword 
      `http://localhost:8983/solr/thai_research/select?facet.field=ProjectYearSubmit&facet.field=OECD1&facet.field=SubmitDepProvinceTH&facet=true&indent=true&q.op=OR?indent=true&q.op=OR&q=ProjectNameTH%3A` + keyword + `*&rows=180&start=0`
      
      // `http://localhost:8983/solr/thai_research/select?indent=true&q.op=OR&q=_text_:` + keyword + `*&rows=180&start=0`
      //&facet.field=SubmitDepProvinceTH
      //?facet.field=ProjectYearSubmit&facet.field=OECD1&facet.field=SubmitDepProvinceTH&
    );
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getByOecd/:oecd", async (req, res) => {
  const oecd = req.params.oecd
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/thai_research/select?indent=true&q.op=OR&q=OECD1:`+ oecd + `*&rows=180&start=0`
        
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    }); 
  }
});


app.get("/getbyid/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/thai_research/select?indent=true&q.op=OR&q=id%3A` + id + `*&rows=180&start=0`
        
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getByYear/:year", async (req, res) => {
  const year= req.params.year;
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/thai_research/select?indent=true&q.op=AND&q=ProjectYearSubmit%3A` + year + `*&rows=180&start=0`
        
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});


app.get("/getDataByFact1/:key/:value", async (req, res) => {
  const key = req.params.key;
  const value = req.params.value;
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/thai_research/select?indent=true&q.op=AND&q=`+ key +`%3A` + value + `*&rows=180&start=0`
        
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getDataByFact/:key1/:value1/:key2/:value2/:value2/:key3/:value3", async (req, res) => {
  const key1 = req.params.key1;
  const key2 = req.params.key2;
  const key3 = req.params.key3;
  const value1 = req.params.value1;
  const value2 = req.params.value2;
  const value3 = req.params.value3;  
  try {
    const data = await sendRequestGetJson(
      // `localhost:8983/solr/thai_research/select?indent=true&q.op=OR&q=`+ key1 + `%3A` + value1 +  key2 + `%3A` + value2 +   key3+ `%3A` + value3 
      // `localhost:8983/solr/thai_research/select?indent=true&q.op=OR&q=`+ key1 + `%3` + value1 + `%26%26` + key2 + `%3` + value2 + `%26%26` +  key3+ `%3` + value3 
      //`http://localhost:8983/solr/thai_research/select?indent=true&fq=`+ key1 +`%3A` + value1 + `&fq=` + key2 +`%3A` + value2 + `&fq=` +  key3 +`%3A` + value3
      //http://localhost:8983/solr/thai_research/select?facet=true&fq=OECD1%3AAAA&fq=ProjectYearSubmit%3AAAA&indent=true&q.op=AND&q=SubmitDepProvinceTH%3AAAA

      `http://localhost:8983/solr/thai_research/select?indent=true&q.op=OR&q=` + key1 + `%3A` + value1 + `%20%26%26%20`+ key2 + `%3A`+ value2 + `%26%26%20%20`+ key3+ `%3A` + value3 
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});



app.get("/getDataBoolean/:year/:province/:oecd", async (req, res) => {
  const year = req.params.year;
  const province = req.params.province;
  const oecd = req.params.oecd;
  try {
    const data = await sendRequestGetJson(
      // `http://localhost:8983/solr/thai_research/select?facet=true&fq=OECD1%3A`+*+`&fq=ProjectYearSubmit%3A`+*+`&fq=SubmitDepProvinceTH%3A`+*+`&indent=true&q.op=AND&q=*%3A*`
      `http://localhost:8983/solr/thai_research/select?facet.field=ProjectYearSubmit&facet.field=OECD1&facet.field=SubmitDepProvinceTH&facet=true&fq=ProjectYearSubmit%3A`+ year +`&fq=SubmitDepProvinceTH%3A`+ province +`&indent=true&q.op=AND&q=OECD1%3A`+ oecd +`*&rows=180&start=0`
        
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});

app.get("/getDataByFactBoolean/:key/:value", async (req, res) => {
  const key = req.params.key;
  const value = req.params.value;
  let sub_key1 = "OECD1"
  let sub_key2 = "ProjectYearSubmit"
  let sub_key3 = "SubmitDepProvinceTH"
  // if(key == "OECD1"){
  //   sub_key1 = "ProjectYearSubmit"
  //   sub_key2 = "SubmitDepProvinceTH"
  // }else if(key == "ProjectYearSubmit"){
  //   sub_key1 = "OECD1"
  //   sub_key2 = "SubmitDepProvinceTH"
  // }else if(key == "SubmitDepProvinceTH"){
  //   sub_key1 = "OECD1"
  //   sub_key2 = "ProjectYearSubmit"
  // }
  try {
    const data = await sendRequestGetJson(
      `http://localhost:8983/solr/thai_research/select?indent=true&q.op=AND&q=`+ key +`%3A` + value + sub_key1 +`%3A` + value
      //http://localhost:8983/solr/thai_research/select?facet=true&fq=OECD1%3AAAA&fq=ProjectYearSubmit%3AAAA&indent=true&q.op=AND&q=SubmitDepProvinceTH%3AAAA

      // ถ้า
    );

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({
      content: "",
    });
  }
});







// app.get("/fact", async (req, res) => {
//   try {
//     const data = await sendRequestGetJson(
//       `http://localhost:8983/solr/thai_research/select?facet.field=ProjectYearSubmit&facet=true&indent=true&q.op=OR&q=*%3A*`
        
//     );

//     res.status(200).json(data.facet_counts.facet_fields);
//   } catch (error) {
//     res.status(500).json({
//       content: "",
//     });
//   }
// });





//กรณีไม่พบ Method เปิดแจ้งเตือน
app.use((req, res, next) => {
  res.status(404).json({ error: "Page not found" });
});

//ให้ run ที่ port ตาม Config
app.listen(PORT, () => {
  console.log("run on : " + PORT);
});

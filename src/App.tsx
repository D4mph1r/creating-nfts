import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import mergeImages, { ImageSource } from "merge-images";
import { Button, Grid } from "@mui/material";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import ReactJson from "react-json-view";
import { sha256 } from "crypto-hash";
import moment from "moment";

function App() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [currImg, setCurrImage] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [copyText, setCopyText] = useState<jsonObjT>({
    name: "Default Name",
    description: "Default description",
    image: "Image URL",
    image_integrity: "sha256 integrity",
    properties: {
      creator: "Default creator",
      created_at: moment().format('LL').toString(),
      traits: {},
    },
  });
  useEffect(() => {
    setIsCopied(false);
  }, [copyText]);
  const navigatorTxt = useRef(null);
  const ref = useRef(null);
  let accs: string[] = [];
  let backs: string[] = [];
  let bikes: string[] = [];
  let bodies: string[] = [];
  let brakes: string[] = [];
  let clothes: string[] = [];
  let eyes: string[] = [];
  let hairs: string[] = [];
  let mouths: string[] = [];
  let pants: string[] = [];
  let shoes: string[] = [];
  let tattoos: string[] = [];
  let weapons: string[] = [];
  let bg: string[] = [];

  const dirs: string[] = [
    "bg",
    "Back",
    "Body",
    "Tattoo",
    "Shoes",
    "Pants",
    "Clothes",
    "Eyes",
    "Mouth",
    "Bike",
    "Brake",
    "Weapon",
    "Hair",
    "Acc",
  ];

  const importAll = (r: any) => {
    let array = new Array();
    r.keys().map((item: string) => {
      return array.push(r(item));
    });
    return array;
  };

  type jsonObjT = {
    name: string;
    description: string;
    image: string;
    image_integrity: string;
    properties: {
      creator: string;
      created_at: string;
      traits: Record<string, string>;
    };
  };
  bg = importAll(require.context("./Images/bg", false, /\.(png|jpe?g|svg)$/));
  accs = importAll(
    require.context("./Images/Acc", false, /\.(png|jpe?g|svg)$/)
  );
  backs = importAll(
    require.context("./Images/Back", false, /\.(png|jpe?g|svg)$/)
  );
  bikes = importAll(
    require.context("./Images/Bike", false, /\.(png|jpe?g|svg)$/)
  );
  bodies = importAll(
    require.context("./Images/Body", false, /\.(png|jpe?g|svg)$/)
  );
  brakes = importAll(
    require.context("./Images/Brake", false, /\.(png|jpe?g|svg)$/)
  );
  clothes = importAll(
    require.context("./Images/Clothes", false, /\.(png|jpe?g|svg)$/)
  );
  eyes = importAll(
    require.context("./Images/Eyes", false, /\.(png|jpe?g|svg)$/)
  );
  hairs = importAll(
    require.context("./Images/Hair", false, /\.(png|jpe?g|svg)$/)
  );
  mouths = importAll(
    require.context("./Images/Mouth", false, /\.(png|jpe?g|svg)$/)
  );
  pants = importAll(
    require.context("./Images/Pants", false, /\.(png|jpe?g|svg)$/)
  );
  shoes = importAll(
    require.context("./Images/Shoes", false, /\.(png|jpe?g|svg)$/)
  );
  tattoos = importAll(
    require.context("./Images/Tattoo", false, /\.(png|jpe?g|svg)$/)
  );
  weapons = importAll(
    require.context("./Images/Weapon", false, /\.(png|jpe?g|svg)$/)
  );
  let DirImages: ImageSource[];

  function getRandomIndex(max: number) {
    return Math.floor(Math.random() * max);
  }

  function copyToClipboard() {
    var copyText = document.getElementById(".jsonText")?.innerText;
    navigator.clipboard.writeText(copyText as any).then((datawaw: any) => {});
  }
  const getAttribute = (fileLocation: string, attr: string) => {
    return fileLocation
      .split("/")[3]
      .split(".")[0]
      .replace(attr, "")
      .replace(/((?<!^)[A-Z](?![A-Z]))(?=\S)/g, " $1")
      .replace(/^./, (s) => s.toUpperCase());
  };

  const handleClick = async () => {
    DirImages = [
      bg[getRandomIndex(bg.length)],
      backs[getRandomIndex(backs.length)],
      bodies[getRandomIndex(bodies.length)],
      tattoos[getRandomIndex(tattoos.length)],
      shoes[getRandomIndex(shoes.length)],
      pants[getRandomIndex(pants.length)],
      clothes[getRandomIndex(clothes.length)],
      eyes[getRandomIndex(eyes.length)],
      mouths[getRandomIndex(mouths.length)],
      bikes[getRandomIndex(bikes.length)],
      brakes[getRandomIndex(brakes.length)],
      weapons[getRandomIndex(weapons.length)],
      hairs[getRandomIndex(hairs.length)],
      accs[getRandomIndex(accs.length)],
    ];
    let b64: string = "";

    try {
      b64 = await mergeImages(DirImages);
      if (ref.current) {
        (ref.current as any).src = b64;
        setCurrImage(b64);
      }
    } catch (ex) {
      console.log(ex);
    }

    const jsonObj: jsonObjT = {
      name: "Default Name",
      description: "Default description",
      image: "Image URL",
      image_integrity: "sha256 integrity",
      properties: {
        creator: "Default creator",
        created_at: moment().format('LL').toString(),
        traits: {},
      },
    };

    jsonObj.name = name;
    jsonObj.description = description;
    jsonObj.image = imageURL;
    jsonObj.properties.creator = creator;
    jsonObj.properties.created_at = moment().format('LL').toString();
    DirImages.map((item, index: number) => {
      if (
        dirs[index] !== "Bike" &&
        dirs[index] !== "Brake" &&
        dirs[index] !== "bg"
      ){
        jsonObj.properties.traits[dirs[index]] = getAttribute(
          item.toString(),
          dirs[index]
        );
      }
    });

    setCopyText(jsonObj);
   console.log(b64);
   const hashImageBase64 = await sha256(b64);
   console.log(hashImageBase64);
   jsonObj.image_integrity = "sha256-" + hashImageBase64;

    // use this in yout metadata.json file

    // @ts-ignore
    navigatorTxt.current.innerText = copyText;
    var copyText = document.getElementById(".jsonText")?.innerText;
    navigator.clipboard.writeText(copyText as any).then((datawaw: any) => {});
    copyToClipboard();
  };

  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    const js: any = JSON.stringify(copyText);
    var vg = navigatorTxt?.current;
    // @ts-ignore
    navigator.clipboard.writeText(js);
    setIsCopied(true);
  };

  return (
    <Container>
      <div className="main">
        <header>
          <div className="img-box">
            {currImg && (
              <a download={`${name.replaceAll(" ", "-")}.png`} href={currImg}>
                Download
              </a>
            )}
            <img
              alt="logo"
              className="App-logo"
              ref={ref}
              onClick={() => {
                console.log(ref);
              }}
            />
          </div>

          <Button
            variant="contained"
            onClick={() => {
              handleClick();
            }}
          >
            Next Random NFT
          </Button>
        </header>
        <div className="side">
          <form className="form-box">
            <label>Name:</label>
            <TextField
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Description:</label>
            <TextField
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Image URL:</label>
            <TextField
              size="small"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <label>Creator:</label>
            <TextField
              size="small"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
            />
          </form>
          <div className="container">
            <div className="copy-text">
              <ReactJson src={copyText} />
            </div>
            <div className="copy-button">
              <Button
                variant="contained"
                onClick={() => {
                  setCopyText((prev) => {
                    return {
                      ...prev,
                      name: name,
                      description: description,
                      image: imageURL,
                      properties: {
                        creator: creator,
                        created_at: prev.properties.created_at,
                        traits: prev.properties.traits,
                      },
                    };
                  });
                }}
              >
                <span>Generate JSON</span>
              </Button>
              <Button variant="contained" onClick={handleCopyClick}>
                <span>{isCopied ? "Copied!" : "Copy"}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default App;

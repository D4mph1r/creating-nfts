import React, { useRef, useState } from "react";
import "./App.css";
import mergeImages, { ImageSource } from "merge-images";
import { Button, Grid } from "@mui/material";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

function App() {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [isCopied, setIsCopied] = useState(false);
  const [copyText, setCopyText] = useState<jasonT>({
    Name: "",
    tokenId: "",
    Description: "",
    attributes: Array(14),
  });
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

  type jasonT = {
    Name: string;
    tokenId: string;
    Description: string;
    attributes: {
      trait_type: string;
      value: string;
    }[];
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

    const jason: {
      Name: string;
      tokenId: string;
      Description: string;
      attributes: { trait_type: string; value: string }[];
    } = {
      Name: "",
      tokenId: "",
      Description: "",
      attributes: [],
    };

    jason.Name = name;
    jason.Description = description;

    DirImages.map((item, index: number) => {
      jason.attributes.push({
        trait_type: dirs[index],
        value: getAttribute(item.toString(), dirs[index]),
      });
    });
    jason.tokenId = token;
    setCopyText(jason);
    try {
      const b64 = await mergeImages(DirImages);
      if (ref.current) {
        (ref.current as any).src = b64;
      }
    } catch (ex) {
      console.log(ex);
    }
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
    navigator.clipboard.writeText(vg.value as any);
    setIsCopied(true);
  };

  return (
    <Container>
      <div className="main">
        <header>
          <div className="img-box">
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
            Click
          </Button>
        </header>
        <div className="side">
          <form className="form-box">
            <label>Enter Name:</label>
            <TextField
              size="small"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Enter Description:</label>
            <TextField
              size="small"
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label>Enter Token:</label>
            <TextField
              size="small"
              type="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </form>
          <div className="container">
            <div className="copy-text">
              <TextareaAutosize
                typeof="any"
                ref={navigatorTxt}
                value={copyText.Name ? JSON.stringify(copyText) : "your json "}
                name="jsonText"
                id="jsonText"
                style={{ width: "100%" }}
                // style={{ width: 200, height: 200 }}
              ></TextareaAutosize>
            </div>
            <div className="copy-button">
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

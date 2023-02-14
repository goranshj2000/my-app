import logo from "./logo.svg";
import "./App.css";
import html2canvas from "html2canvas";
import { toBlob } from "html-to-image";

import {
  Button, 
  Flex, 
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
 } from "@chakra-ui/react";

import propTypes from "prop-types";
import pokemon from "./pokemon.json";
import { useRef, useState} from "react";

//this is a component
const PokemonRow = ({ pokemon, onSelect }) => (
  <tr>
    <td> {pokemon.name.english} </td>
    <td> {pokemon.type.join(", ")} </td>
    <td> 
      <Button onClick={() => onSelect(pokemon)}>Select!</Button>
    </td>
  </tr>
);


function BasicUsage() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const printRef = useRef();

  const handleDownloadImage = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if(typeof link.download === 'string') {

      link.href = data;
      link.download = 'Your badges.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  const handleShareImage = async () => {
    // const newFile = await toBlob(printRef.current);
    // const data = {
    //   files: [
    //     new File([newFile], "Your badges.jpg", {
    //       type: newFile.type
    //     })
    //   ],
    //   title: "Badges",
    //   text: "See these Badges"
    // };
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');

    try {
      if (!navigator.canShare(data)) {
        console.error("Can't share");
      }
      await navigator.share(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div ref={printRef}> This part will be in the image </div>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={handleDownloadImage}>
              Download
            </Button>
            <Button colorScheme='blue' mr={2} onClick={handleShareImage}>
              Share
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
PokemonRow.propTypes = {
  pokemon: propTypes.shape({
    name: propTypes.shape({
      english: propTypes.string,
    }),
    type: propTypes.arrayOf(propTypes.string),
  }),
  onSelect: propTypes.func,
};

const PokemonInfo = ({ name, base}) => (
  <div>
    <h1>{name.english}</h1>
  </div>
)

PokemonInfo.propTypes = {
  name: propTypes.shape({
    english: propTypes.string,
  }),
  id: propTypes.number,
  base: propTypes.shape({

  }),
}

function App() {
  const [filter, filterSet] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  return (
    <div
      style={{
        margin: "auto",
        width: 800,
        paddingTop: "1rem",
      }}
    >
      <h1 className="title">Pokemon</h1>
      <BasicUsage>hey</BasicUsage>
      <Input value={filter} onChange={(evt) => filterSet(evt.target.value)} />
      <div style={{
        display: 'grid',
        gridTemplateColumns: '70% 30%',
        gridColumnGap: '1rem'
      }}>
        <table width="100%">
          <thead>
            <tr>
              <th> Name </th>
              <th> Type </th>
            </tr>
          </thead>
          <tbody>
            {pokemon
              .filter((pokemon) =>
                pokemon.name.english.toLowerCase().includes(filter)
              )
              .slice(0, 50)
              .map((pokemon) => (
                <PokemonRow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => setSelectedItem(pokemon)} />
              ))}
          </tbody>
        </table>
        <div>
          {selectedItem && <PokemonInfo {...selectedItem} />}
        </div>
      </div>
    </div>
  );
}

export default App;

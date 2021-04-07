import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup, Source, Layer } from "react-map-gl";
import aStar from "./tes.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [selectedPark, setSelectedPark] = useState(null);
  const [selectedStartEnd, setSelectedStartEnd] = useState([]);
  const [data, setData] = useState({});
  const [coor, setCoor] = useState([]);

  const [viewport, setViewport] = useState({});

  const SIZE = 20;//
  const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7`;

  let polylineGeoJSON = {
    'type': 'Feature',
    'properties': {},
    'geometry': {
        'type': 'LineString',
        'coordinates': [] // [107.60845619489565, -6.8938593825294925], [107.61043792489653, -6.893194719054599]
    }
  }
  
  const handleClick = () => {
    console.log(polylineGeoJSON);
    setSelectedStartEnd([]);
    setSelectedPark(null);
  }

  const readFileOnUpload = (uploadedFile) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setData(JSON.parse(fileReader.result));
      console.log(JSON.parse(fileReader.result));

      setSelectedStartEnd([]);
      setSelectedPark(null);
      setViewport({
        latitude: JSON.parse(fileReader.result).nodes[0].coordinate[1],
        longitude: JSON.parse(fileReader.result).nodes[0].coordinate[0],
        minWidth: "100vw",
        minHeight: "100vh",
        zoom: 15
      });

      let coorTemp = [];
      JSON.parse(fileReader.result).nodes.forEach(element => {
          coorTemp.push(element.coordinate);
      })
      setCoor(coorTemp);
    };
    if (uploadedFile !== undefined) {
       fileReader.readAsText(uploadedFile);
    }
 }

  useEffect(() => {
    const listener = e => {
      if (e.key === "Escape") {
        setSelectedPark(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div>
        <Form style={{
          margin: 'auto',
          width: '50%',
          border: '3px solid green',
          padding: '10px',
        }}>
          <Form.Group style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '50%',
            padding: '10px',
          }}>
            <Form.File id="fileForm">
              <Form.File.Label style={{
                display: 'block',
                textAlign: 'center',
                lineHeight: '150%',
              }}>Silakan upload file JSON sebagai peta
              </Form.File.Label>
              <Form.File.Input
                style={{
                  textAlign: 'center',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
                onChange={(e)=>readFileOnUpload(e.target.files[0])} />
            </Form.File>
          </Form.Group>
        </Form>

      {(JSON.stringify(data) !== JSON.stringify({})) ? (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        <Button
          className="resetButton"
          style={{ 
            marginTop: '10px',
            marginLeft: '90%',
            height: '50px', 
            width : '150px'
          }}
          onClick={handleClick}
        >
          Reset Nodes
        </Button>

        {data.nodes.map(node => (
          <Marker
            key={node.id}
            latitude={node.coordinate[1]}
            longitude={node.coordinate[0]}
          >
            <svg
              height={SIZE}
              viewBox="0 0 24 24"
              style={{
                cursor: 'pointer',
                fill: '#008000',
                stroke: 'none',
                transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
              }}
              onClick={e => {
                e.preventDefault();
                setSelectedPark(node);

                console.log(selectedStartEnd);
                if (selectedStartEnd.length === 0) {
                  setSelectedStartEnd([node]);
                  console.log(selectedStartEnd);
                }
                else if (selectedStartEnd.length === 1) {
                  setSelectedStartEnd([selectedStartEnd[0], node]);
                  let matrix = data["adjacency matrix"];
                  let coor = []
                  data.nodes.forEach(element => {
                      coor.push(element.coordinate);
                  })    
                  let e = aStar(selectedStartEnd[0].id, node.id, matrix, coor);
                  console.log(polylineGeoJSON);
                }
              }}
            >
              <path d={ICON} />
            </svg>
          </Marker>
        ))}

        {selectedPark ? (
          <Popup
            latitude={selectedPark.coordinate[1]}
            longitude={selectedPark.coordinate[0]}
            onClose={() => {
              setSelectedPark(null);
            }}
          >
            <div>
              <h2>{selectedPark.name}</h2>
            </div>
          </Popup>
        ) : null}

        {(selectedStartEnd.length === 2) ? (
        <Source id='polylineLayer' type='geojson' data={{
          'type': 'Feature',
          'properties': {},
          'geometry': {
              'type': 'LineString',
              'coordinates': aStar(selectedStartEnd[0].id, selectedStartEnd[1].id, data["adjacency matrix"], coor)
          }
        }} >
          {(selectedStartEnd.length === 2) ? (
              <Layer
                id='lineLayer'
                type='line'
                source='my-data'
                layout={{
                'line-join': 'round',
                'line-cap': 'round',
                }}
                paint={{
                'line-color': 'rgba(3, 170, 238, 0.5)',
                  'line-width': 5,
                }}
              />
            ) : null}
          </Source>
          ) : <Source id='polylineLayer' type='geojson' data={polylineGeoJSON}>
            </Source>}
      
      </ReactMapGL>
      ) : null}
    </div>
  );
}

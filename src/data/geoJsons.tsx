import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../constants";
import { GeoJSON } from "react-leaflet";

interface Coordinates {
  id: number;
  locationId: number;
  type: string;
  coordinates: number[][];
}

interface Features {
  type: string;
  properties: {
    name: string;
  };
  geometry: {
    coordinates: number[][];
    type: string;
  };
}

export const MapPolygons = () => {
  let dataRetrieval: Features[] = [];
  const [data, setData] = useState<Coordinates[]>();
  const [show, setShow] = useState<boolean>(false);

  let getData = async () => {
    try {
      const data = await axios.get<Coordinates[]>(`${backendUrl}/coordinates`);
      // console.log(data.data);
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data) {
    for (const coordinate of data) {
      dataRetrieval.push({
        type: "Feature",
        properties: {
          name: coordinate.locationId.toString(),
        },
        geometry: {
          coordinates: coordinate.coordinates,
          type: coordinate.type,
        },
      });
    }
  }

  const mapData = {
    type: "FeatureCollection" as const,
    features: dataRetrieval,
  };

  return (
    <GeoJSON
      data={mapData}
      eventHandlers={{
        click: (e) => {
          setShow(true);
          console.log(show);
          console.log(e.layer.feature);
        },
      }}
    />
  );
};

export const geoJson = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature",
      properties: {
        name: "Elephants of Asia",
        locationId: 2,
      },
      geometry: {
        coordinates: [
          [
            [103.79529679188073, 1.405707364375786],
            [103.79533486690622, 1.4056867166028013],
            [103.79542052383465, 1.4055912049355896],
            [103.7954688431264, 1.4053716378672192],
            [103.79545283714037, 1.4052662603461101],
            [103.79533313707731, 1.4050532802599065],
            [103.79502111032457, 1.4048730874146855],
            [103.79500463783893, 1.4048697939080483],
            [103.79511006174897, 1.4048203913049377],
            [103.79516955389863, 1.4047891509015216],
            [103.7952288548475, 1.40471559591046],
            [103.7952804686372, 1.404677171661092],
            [103.79536283106557, 1.4046650954676636],
            [103.79546056781652, 1.4046058123381613],
            [103.7955352430858, 1.404595931816118],
            [103.79559234770403, 1.404627769052837],
            [103.79565274681818, 1.404679367332733],
            [103.79572940932161, 1.4047026493991268],
            [103.7958029864256, 1.4047564433488873],
            [103.79599626359254, 1.4050023585279092],
            [103.79608191975603, 1.4051286092305162],
            [103.79613463171103, 1.4052504689686884],
            [103.79613572987637, 1.4053404914738366],
            [103.79611815922533, 1.4054733295542405],
            [103.7960617046383, 1.4055627023375052],
            [103.79598483303846, 1.4056351594660441],
            [103.79572127326338, 1.4057647040243069],
            [103.79565866772646, 1.4057819788067007],
            [103.79555462842075, 1.4057955450665105],
            [103.79535559670626, 1.4057548462868112],
            [103.79529679188073, 1.405707364375786],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Shaw Foundation Amphitheater",
        locationId: 60,
      },
      geometry: {
        coordinates: [
          [
            [103.79506893263687, 1.4047944979033247],
            [103.79498158128533, 1.4047856812650181],
            [103.79487288240874, 1.4047589279381008],
            [103.79480075908106, 1.404728111883827],
            [103.79474207347607, 1.4046622702027207],
            [103.79473665579235, 1.4046135969563807],
            [103.79471572292192, 1.4045525576935063],
            [103.79469072610186, 1.4045043837405444],
            [103.79480679308114, 1.4044661756617103],
            [103.7948791682499, 1.4041835450730105],
            [103.79536067543233, 1.4043408327131175],
            [103.79531205582163, 1.4044687068817865],
            [103.79528382108998, 1.404520791883229],
            [103.79513407391966, 1.4045123608169376],
            [103.79511027427043, 1.4045412517079114],
            [103.79519527301721, 1.4046109297379132],
            [103.79521567271644, 1.4046670120529114],
            [103.79506893263687, 1.4047944979033247],
          ],
        ],
        type: "Polygon",
      },
      id: 1,
    },
    {
      type: "Feature",
      properties: {
        name: "Australasia",
        locationId: 1,
      },
      geometry: {
        coordinates: [
          [
            [103.79317549926503, 1.4056632378216847],
            [103.79323880783375, 1.4057787183320727],
            [103.79335688950442, 1.405897047385153],
            [103.79349404103345, 1.4059720889632956],
            [103.79364478535405, 1.40602373101693],
            [103.79374855005437, 1.4060315696903132],
            [103.79374629430009, 1.4060620672952666],
            [103.79357433748623, 1.406253257605897],
            [103.7933808014879, 1.4062746068705252],
            [103.79321662957318, 1.4062385799860238],
            [103.79301775465103, 1.406013078368673],
            [103.79299506422342, 1.4057862424002963],
            [103.79317549926503, 1.4056632378216847],
          ],
        ],
        type: "Polygon",
      },
    },
    // {
    //   type: "Feature",
    //   properties: {
    //     name: "Red River Hog Enclosure",
    //   },
    //   geometry: {
    //     coordinates: [
    //       [
    //         [103.79290410639805, 1.4056330589650514],
    //         [103.79290410639805, 1.4054134094475046],
    //         [103.7931339738982, 1.4054134094475046],
    //         [103.7931339738982, 1.4056330589650514],
    //         [103.79290410639805, 1.4056330589650514],
    //       ],
    //     ],
    //     type: "Polygon",
    //   },
    // },
    {
      type: "Feature",
      properties: {
        name: "The Great Rift of Ethiopia",
        locationId: 4,
      },
      geometry: {
        coordinates: [
          [
            [103.79364802317605, 1.405980464204589],
            [103.79339097795679, 1.4058673983567758],
            [103.79327993442178, 1.4057502210174988],
            [103.79321824356936, 1.4056474338726304],
            [103.7931976799519, 1.4055384794938135],
            [103.79322646901682, 1.405207504841087],
            [103.79337247070112, 1.404973150089262],
            [103.7935904450461, 1.4049155892698195],
            [103.79368709404912, 1.4048559727051924],
            [103.79374878490165, 1.40474496254555],
            [103.79381047575413, 1.4047922446513894],
            [103.79399966103534, 1.4048292480373448],
            [103.79402639373723, 1.4048641956789538],
            [103.79407163369586, 1.4051026619288223],
            [103.79384440571982, 1.4052804837281911],
            [103.79404235087111, 1.405513543449814],
            [103.79397473485301, 1.405643101822207],
            [103.79389021483189, 1.405719146950048],
            [103.79377778072092, 1.4058005757523802],
            [103.79364802317605, 1.405980464204589],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Pygmy Hippo Enclosure",
        locationId: 75,
      },
      geometry: {
        coordinates: [
          [
            [103.7929046162476, 1.4053675452410914],
            [103.7928698446076, 1.4052106233306176],
            [103.7928976619196, 1.4051401077850159],
            [103.79301389854845, 1.405035824226971],
            [103.79308344182988, 1.405080517181517],
            [103.79313311560333, 1.4052016847393531],
            [103.79312814822634, 1.4053705247705608],
            [103.7929046162476, 1.4053675452410914],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Primate Kingdom",
        locationId: 5,
      },
      geometry: {
        coordinates: [
          [
            [103.79433617322792, 1.405599268829718],
            [103.79429848445898, 1.4055771538179584],
            [103.7942116364278, 1.4054985226625405],
            [103.79429808724467, 1.4053219342942214],
            [103.79417270552358, 1.40514954274515],
            [103.79430841824501, 1.4051228442564963],
            [103.79437666300726, 1.4050923316970483],
            [103.79427494938227, 1.4047387295583604],
            [103.79471661019323, 1.4048370310631952],
            [103.79500163890737, 1.4049103884970577],
            [103.79530277619887, 1.40508447506501],
            [103.79541788935586, 1.4052790999653837],
            [103.79520027899969, 1.4052727809294367],
            [103.79518180862425, 1.4053530179582339],
            [103.79513429152229, 1.4053997156331377],
            [103.79497724407173, 1.4054661389065757],
            [103.7944002763897, 1.4056057124464445],
            [103.79433617322792, 1.405599268829718],
          ],
        ],
        type: "Polygon",
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Africa Penguin",
        locationId: 70,
      },
      geometry: {
        coordinates: [
          [
            [103.79382379247426, 1.4041666177963492],
            [103.79387868083722, 1.4040043878863315],
            [103.79435128572504, 1.4038136077692371],
            [103.7943893444646, 1.4039328226879633],
            [103.79438596146537, 1.4039750974806964],
            [103.79435128572504, 1.404013144793609],
            [103.7939800015892, 1.4041391236682017],
            [103.79382379247426, 1.4041666177963492],
          ],
        ],
        type: "Polygon",
      },
      id: 7,
    },
    {
      type: "Feature",
      properties: {
        name: "Rainforest Kidzworld",
        locationId: 6,
      },
      geometry: {
        coordinates: [
          [
            [103.79613138658118, 1.4031491354510166],
            [103.79625618868295, 1.4031251254109662],
            [103.79633806954462, 1.4030858677918445],
            [103.79636313511435, 1.403046610172865],
            [103.79636981926689, 1.4029923177194235],
            [103.79636262769128, 1.4028336985855248],
            [103.79650717247881, 1.402825345899842],
            [103.79665088174767, 1.4028529097631548],
            [103.7967081048323, 1.4028798712323294],
            [103.79685849825222, 1.4029884561423955],
            [103.79749609404791, 1.403170401619235],
            [103.79767830407718, 1.4032421071956094],
            [103.79782801287132, 1.403353925046602],
            [103.79790889003687, 1.4034640226183654],
            [103.79796699620204, 1.4035812764914795],
            [103.7979618338303, 1.403698255149692],
            [103.79789128140999, 1.403899527239659],
            [103.79769683205137, 1.404078435746058],
            [103.79750460138695, 1.4041658080325874],
            [103.7973531718028, 1.4041761296765856],
            [103.79721378775395, 1.4041245214560405],
            [103.79697459761763, 1.4039112075540459],
            [103.79670099189013, 1.4037925086320797],
            [103.79634820606805, 1.403680700342747],
            [103.7961984974213, 1.4035964068430076],
            [103.79609008760497, 1.4034966309244794],
            [103.79607287969623, 1.4034295402185109],
            [103.79607460048794, 1.4033727711580894],
            [103.79618817267607, 1.4031869814949829],
            [103.79613138658118, 1.4031491354510166],
          ],
        ],
        type: "Polygon",
      },
      id: 8,
    },
    {
      type: "Feature",
      properties: {
        name: "Houbii Spot Rope Course",
        locationId: 61,
      },
      geometry: {
        coordinates: [
          [
            [103.79541044087506, 1.4032430733057168],
            [103.79525988239311, 1.4031599774033054],
            [103.79535554976121, 1.4029984891321021],
            [103.79553747459306, 1.402924800305442],
            [103.79560961719875, 1.403084720734327],
            [103.79541044087506, 1.4032430733057168],
          ],
        ],
        type: "Polygon",
      },
      id: 9,
    },
    {
      type: "Feature",
      properties: {
        name: "Wild Africa",
        locationId: 11,
      },
      geometry: {
        coordinates: [
          [
            [103.7931369061011, 1.4027829889344616],
            [103.79335465573593, 1.4025093798901622],
            [103.79356668168452, 1.4022988613172203],
            [103.79373327922713, 1.402001454783516],
            [103.79375877885053, 1.4018705958973925],
            [103.79372477935215, 1.401802617251434],
            [103.79384037742335, 1.4013845479422429],
            [103.7938794768474, 1.4013301650146701],
            [103.79397297546757, 1.4011721146243872],
            [103.79429937065413, 1.4010106652905137],
            [103.79451356749416, 1.4010004684899968],
            [103.79453226721887, 1.4012570879541926],
            [103.79456116679154, 1.4014151383378533],
            [103.79466826596973, 1.4014933135964043],
            [103.79477706436535, 1.4016700580935435],
            [103.7947906641644, 1.4017839223301678],
            [103.79474136616005, 1.401943672058195],
            [103.7946070681412, 1.4020592357472026],
            [103.79438267145144, 1.4022937620400597],
            [103.7943886691233, 1.4023702416990318],
            [103.79434275932203, 1.402532738518417],
            [103.79421999000164, 1.402765154701811],
            [103.79418896986573, 1.4028433020146167],
            [103.79417780261736, 1.4030839461071025],
            [103.79412196637298, 1.403241481144363],
            [103.79379264521896, 1.403126996581122],
            [103.79356930024278, 1.4030290023423078],
            [103.79347251741939, 1.4030711770782602],
            [103.79334099204317, 1.4029409315669596],
            [103.79317200656652, 1.4028340288538317],
            [103.7931369061011, 1.4027829889344616],
          ],
        ],
        type: "Polygon",
      },
      id: 10,
    },
    // {
    //   type: "Feature",
    //   properties: {
    //     name: "Fossa Enclosure",
    //   },
    //   geometry: {
    //     coordinates: [
    //       [
    //         [103.79461358217947, 1.4020668970035786],
    //         [103.79474054912077, 1.4019510057028555],
    //         [103.79494497476367, 1.4020074724364804],
    //         [103.794964829543, 1.402112207075234],
    //         [103.79486006319996, 1.402204984789904],
    //         [103.79480452074517, 1.4022166020472895],
    //         [103.79476070953774, 1.4021747268332945],
    //         [103.7946662591757, 1.4021447707886239],
    //         [103.79461358217947, 1.4020668970035786],
    //       ],
    //     ],
    //     type: "Polygon",
    //   },
    //   id: 11,
    // },
    {
      type: "Feature",
      properties: {
        name: "Naked Mole Rate Enclosure",
        locationId: 73,
      },
      geometry: {
        coordinates: [
          [
            [103.79474627522092, 1.4019461624310736],
            [103.79479497160094, 1.4017899026699467],
            [103.7949397624356, 1.4020000498650376],
            [103.79474627522092, 1.4019461624310736],
          ],
        ],
        type: "Polygon",
      },
      id: 12,
    },
    {
      type: "Feature",
      properties: {
        name: "Orangutan",
        locationId: 12,
      },
      geometry: {
        coordinates: [
          [
            [103.79383922854328, 1.4032259431347],
            [103.79410560804581, 1.40333179166079],
            [103.7942965976361, 1.4033271096907498],
            [103.7944575691962, 1.403491317902862],
            [103.79424643287774, 1.4036272556074323],
            [103.79408864961573, 1.4038374251676515],
            [103.79383990137677, 1.4037481369552438],
            [103.7936681055292, 1.4033960614489587],
            [103.79383922854328, 1.4032259431347],
          ],
        ],
        type: "Polygon",
      },
      id: 13,
    },
    {
      type: "Feature",
      properties: {
        name: "Malayan Sun Bear",
        locationId: 69,
      },
      geometry: {
        coordinates: [
          [
            [103.79430242470943, 1.4033222678054784],
            [103.79437747558148, 1.4031758451170617],
            [103.79456380235911, 1.4032744526273007],
            [103.79446972337797, 1.4034844775454047],
            [103.79430242470943, 1.4033222678054784],
          ],
        ],
        type: "Polygon",
      },
      id: 14,
    },
    {
      type: "Feature",
      properties: {
        name: "Chimpanzee Enclosure",
        locationId: 66,
      },
      geometry: {
        coordinates: [
          [
            [103.79607812202829, 1.4029411828388163],
            [103.79582747212993, 1.4027963947315527],
            [103.79585440386057, 1.4026821078177392],
            [103.79598258038652, 1.4026576340985741],
            [103.79599657000244, 1.4026308361574706],
            [103.79600823700457, 1.4025691106750884],
            [103.79614795256799, 1.4024992769929554],
            [103.79632408777599, 1.402788227214245],
            [103.79626704590743, 1.4028722665995446],
            [103.79620293845363, 1.402925993985221],
            [103.79607812202829, 1.4029411828388163],
          ],
        ],
        type: "Polygon",
      },
      id: 15,
    },
    {
      type: "Feature",
      properties: {
        name: "Reptile Garden",
        locationId: 7,
      },
      geometry: {
        coordinates: [
          [
            [103.79480347864535, 1.4036192844292827],
            [103.79462313271824, 1.4035154091828161],
            [103.79469709449933, 1.4033278804486002],
            [103.79438279010867, 1.4031712963283098],
            [103.79468783541216, 1.4025090466606969],
            [103.79504358899652, 1.4023542669073805],
            [103.79519621671261, 1.402510276843202],
            [103.79550887959158, 1.402511506147718],
            [103.79552441228594, 1.4028698195689202],
            [103.79532107276424, 1.4029524835125926],
            [103.79529891180101, 1.4029895173606377],
            [103.79492125031817, 1.4035447456313932],
            [103.79480347864535, 1.4036192844292827],
          ],
        ],
        type: "Polygon",
      },
      id: 18,
    },
    {
      type: "Feature",
      properties: {
        name: "Fragile Forest",
        locationId: 3,
      },
      geometry: {
        coordinates: [
          [
            [103.79551556993772, 1.4024924081847274],
            [103.79520711956826, 1.4024924081847274],
            [103.79506255677535, 1.4023452261533436],
            [103.79504857025972, 1.4021412397965207],
            [103.79538758888293, 1.4021293861742947],
            [103.79569334703126, 1.4019540302104474],
            [103.79577165397097, 1.4021649490355088],
            [103.79570772843209, 1.4024093089716843],
            [103.79551556993772, 1.4024924081847274],
          ],
        ],
        type: "Polygon",
      },
      id: 17,
    },
    {
      type: "Feature",
      properties: {
        name: "Celebes Crested Macaque Enclosure",
        locationId: 65,
      },
      geometry: {
        coordinates: [
          [
            [103.79590469194346, 1.4024924081847274],
            [103.7957882565023, 1.402176804651333],
            [103.79582847208604, 1.4020369507158392],
            [103.79599915211958, 1.4020653880916427],
            [103.79605855615353, 1.4021886609327652],
            [103.79613481738949, 1.402473411202294],
            [103.79590469194346, 1.4024924081847274],
          ],
        ],
        type: "Polygon",
      },
      id: 18,
    },
    {
      type: "Feature",
      properties: {
        name: "Otter Enclosure",
        locationId: 71,
      },
      geometry: {
        coordinates: [
          [
            [103.79207627152834, 1.4048881159253312],
            [103.79189051707448, 1.4047022852816013],
            [103.79189480928835, 1.4046233087834423],
            [103.79197591329017, 1.4045977018180196],
            [103.79206341785573, 1.4046339793696205],
            [103.79216158623785, 1.4046083709689725],
            [103.79216810966216, 1.4048902529643215],
            [103.79207627152834, 1.4048881159253312],
          ],
        ],
        type: "Polygon",
      },
      id: 19,
    },
    {
      type: "Feature",
      properties: {
        name: "Babirusa Enclosure",
        locationId: 72,
      },
      geometry: {
        coordinates: [
          [
            [103.7924883192328, 1.4047684800081726],
            [103.79242621996758, 1.4046041032365082],
            [103.79255208615564, 1.4045699648258676],
            [103.79263132031133, 1.4047385827667682],
            [103.7924883192328, 1.4047684800081726],
          ],
        ],
        type: "Polygon",
      },
      id: 20,
    },
    {
      type: "Feature",
      properties: {
        name: "Treetop Trail",
        locationId: 10,
      },
      geometry: {
        coordinates: [
          [
            [103.79148877609663, 1.4051445757044405],
            [103.79176181769122, 1.4048926807201383],
            [103.79190494165084, 1.4049972407245832],
            [103.79163832573875, 1.4052471368641761],
            [103.79148877609663, 1.4051445757044405],
          ],
        ],
        type: "Polygon",
      },
      id: 21,
    },
    {
      type: "Feature",
      properties: {
        name: "Proboscis Monkeys Enclosure",
        locationId: 74,
      },
      geometry: {
        coordinates: [
          [
            [103.79141527869922, 1.4047904029081906],
            [103.79130854190441, 1.4045836115086132],
            [103.7914109116939, 1.4045942653666685],
            [103.79153879167967, 1.4045005318860575],
            [103.79162426101055, 1.4046731224668463],
            [103.7916199948254, 1.4046731224668463],
            [103.79141527869922, 1.4047904029081906],
          ],
        ],
        type: "Polygon",
      },
      id: 22,
    },
    {
      type: "Feature",
      properties: {
        name: "Tigers Enclosure",
        locationId: 68,
      },
      geometry: {
        coordinates: [
          [
            [103.7931312245525, 1.4049460445055502],
            [103.79304996603639, 1.4049331922303452],
            [103.79293664355208, 1.4048304051963498],
            [103.79291099539716, 1.4047940147372202],
            [103.79277851418942, 1.4047041386632202],
            [103.79284907042285, 1.4045608525910893],
            [103.79310541338953, 1.4045779557128242],
            [103.79316740825044, 1.4046549387630023],
            [103.79325501131456, 1.4046549387630023],
            [103.79331709031425, 1.4047747520113631],
            [103.79321888236893, 1.4049289083313568],
            [103.7931312245525, 1.4049460445055502],
          ],
        ],
        type: "Polygon",
      },
      id: 23,
    },
    {
      type: "Feature",
      properties: {
        name: "Pelican, Gibbon & Red-Ruffed Lemur Enclosure",
        locationId: 76,
      },
      geometry: {
        coordinates: [
          [
            [103.79260729024787, 1.4042455820152924],
            [103.79265223313757, 1.404177171050776],
            [103.79271422102897, 1.4041322897006694],
            [103.79322885759893, 1.403931521735288],
            [103.79341034346584, 1.4039870321296064],
            [103.79339759336415, 1.404061783220797],
            [103.79346807975736, 1.4040831460653749],
            [103.79344679434467, 1.4041579348918276],
            [103.79334644848586, 1.4042177870986592],
            [103.79306019689824, 1.404237029301214],
            [103.79280805539912, 1.4043140175461986],
            [103.79267129978876, 1.4043182955835078],
            [103.79260729024787, 1.4042455820152924],
          ],
        ],
        type: "Polygon",
      },
      id: 24,
    },
  ],
};
import React from "react";
import { Line, Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import { useStateContext } from '../../contexts/ContextProvider';
import { Colors } from 'chart.js';

const hours =[0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 7.0, 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8.0, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9, 9.0, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 10.0, 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 11.0, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9, 12.0, 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 13.0, 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8, 13.9, 14.0, 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7, 14.8, 14.9, 15.0, 15.1, 15.2, 15.3, 15.4, 15.5, 15.6, 15.7, 15.8, 15.9, 16.0, 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7, 16.8, 16.9, 17.0, 17.1, 17.2, 17.3, 17.4, 17.5, 17.6, 17.7, 17.8, 17.9, 18.0, 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 18.7, 18.8, 18.9, 19.0, 19.1, 19.2, 19.3, 19.4, 19.5, 19.6, 19.7, 19.8, 19.9, 20.0, 20.1, 20.2, 20.3, 20.4, 20.5, 20.6, 20.7, 20.8, 20.9, 21.0, 21.1, 21.2, 21.3, 21.4, 21.5, 21.6, 21.7, 21.8, 21.9, 22.0, 22.1, 22.2, 22.3, 22.4, 22.5, 22.6, 22.7, 22.8, 22.9, 23.0, 23.1, 23.2, 23.3, 23.4, 23.5, 23.6, 23.7, 23.8, 23.9, 24.0];
const Energy =[0,0.21295928667868008,0.37565373279760766,0.19424938024076374,0.092715548780326035,0.16949982025667029,0.18696965071596416,0.1265281358932587,0.10972425656647486,0.13076198668518188,0.12792192029090024,0.1111558848390978,0.11024195745614318,0.11607345686306088,0.1145043013449288,0.11182870576362247,0.11432512910888187,0.11787362895701398,0.1197092536084093,0.12219753865667156,0.12636914394110865,0.13081810420981424,0.13513599141664398,0.14003417823521572,0.14557813300907518,0.15134928160612227,0.15732384349789905,0.16367810495571705,0.17036493081051221,0.17726657587881592,0.18439087104248911,0.191768165963532,0.19936419803284969,0.2071435097750631,0.21510564879843724,0.22324808343511113,0.23155230879681574,0.24000438856573358,0.24859931490664211,0.25732987136633834,0.26618572122826367,0.27515911036065743,0.28424452467427747,0.29343574732313621,0.30272633466027726,0.31211099099479955,0.32158508865908014,0.33114395553352183,0.34078320856747468,0.35049900023265068,0.3602877591672824,0.37014606888444895,0.380070778707608,0.39005901792214071,0.40010810639594485,0.41021553013116779,0.42037896368964295,0.43059625566482523,0.44086539684250775,0.451184511174452,0.46155185433195717,0.47196580116716835,0.482424832091358,0.49292752652111743,0.50347255715440786,0.51405868161312862,0.52468473498600288,0.53534962451247958,0.54605232437583451,0.5567918701619573,0.56756735401446856,0.57966147595629625,0.602461585093854,0.64098975518241208,0.69018040954162818,0.74813289286003293,0.81770275863278885,0.8995429228095787,0.9921368368338459,1.0953605921608789,1.210040350716447,1.3347830411094268,1.4591854493034278,1.5779686627850666,1.696798811553939,1.8177729363835455,1.9377053540123703,2.055872829872921,2.1740134225093506,2.2923027406102063,2.4097944665412374,2.5247407884105377,2.627370144399872,2.7138871907772177,2.7898615816597969,2.85673303695899,2.9115400107536327,2.9539621670160945,2.9856239970999865,3.0065449568972582,3.01593300162581,3.0163705020042486,3.0262336712701909,3.0549941468814015,3.0927336475287612,3.135901120832524,3.1900260642469189,3.2562653996823534,3.33166607226404,3.4160181821872073,3.5108891006208975,3.6149484477473348,3.7182304594271085,3.8159708939960946,3.913546564760118,4.0122975893776829,4.1086510263586318,4.2029783765011262,4.2976331828970924,4.3921746824024224,4.4854367140531517,4.5780607726181231,4.6726063122690062,4.7698838155327783,4.8685428514644036,4.968322528643343,5.0699523479968454,5.1734825303272656,5.2785298570565455,5.3851132384603666,5.4934293261470364,5.6032629479107339,5.7131993220940345,5.822565124613277,5.9321269961429577,6.04214571930639,6.1521934638537408,6.2621842193834345,6.3723496917350833,6.4827076597090256,6.5931357598810436,6.7035203171720621,6.81307115073228,6.9213239549446408,7.0287133950461191,7.1354304818152148,7.2412279371727708,7.346035437085356,7.4499894797670825,7.5531109017415421,7.6553266872995946,7.7578913730905183,7.8699171722648069,7.9962523209660361,8.1319423534306345,8.275068016978,8.4284431107993054,8.5927709270744561,8.7665292424944745,8.9495442053965526,9.1426736841413128,9.3440574019673033,9.5373072819221125,9.7123355662543958,9.8779982702909681,10.03861138861132,10.189021990831922,10.327510772338586,10.456959764568396,10.577955964864705,10.688941047073477,10.789816677462074,10.881548931017832,10.964188818936385,11.037254267916822,11.100796169133362,11.155079600013796,11.200069058937055,11.235654398031933,11.261889486140852,11.278846794052841,11.287601425358547,11.296104280395372,11.308628531023096,11.320858315053954,11.331151957452736,11.341915685500275,11.353685924124225,11.365166345878903,11.376244819029596,11.387605876828413,11.399234540987717,11.410784709703263,11.422306588538456,11.433969954150456,11.445727400919736,11.457497654974587,11.469314562622053,11.481214912845605,11.493176392613117,11.505182592626523,11.517246559927541,11.529374673244829,11.541559127780792,11.553797312225234,11.566093225301316,11.578447406064562,11.590857466049574,11.603323162258638,11.615845493145487,11.628424185190687,11.641058538842849,11.653748587493464,11.666494474422814,11.679295964064098,11.692152820254563,11.705065008012777,11.718032474732412,11.73105507394693,11.744131425948725,11.757232507268059,11.770320293809295,11.783407842763276,11.79651289517936,11.809626444439946,11.822740428268389,11.835860326862374,11.848989453863728,11.862124480734636,11.875264015117294,11.888409817303319,11.901562268496352,11.914720314052444,11.927883784349001,11.941053134601278,11.954228292137993,11.967408932732514,11.980595034699657,11.993786668726077,12.006983741050696,12.020186132698617];
const reducedHours=[];
const reducedEnergy =[];
for (let i =0; i <=240; i=i+10) {
    reducedHours.push(hours[i]);
    reducedEnergy.push(Energy[i]);

}
const chartData = {
    labels: reducedHours,
    datasets: [
        {
            label:'Energy',
            data: reducedEnergy,
            borderColor: '#03C9D7',
            fill:false,
            tension: 0.1,
            borderWidth: 3,
            pointRadius: 0,
        },
    ],
};
const chartOptions = {
    scales: {
        x: {
            type: 'linear',
            position: 'bottom',
            title: {
                display: false, 
                text: 'Hour',
            },
        },
        y: {
            title: {
                display: true,
                text: 'Energy',
            },
        },
    },
};
const BarChartEnergy= () => {
    const { currentMode } = useStateContext();

    return (
        <div>
            <Bar data={chartData} options={chartOptions} background={currentMode === 'Dark' ? '#33373E' : '#fff'}
 />
        </div>
    );
};
export default BarChartEnergy
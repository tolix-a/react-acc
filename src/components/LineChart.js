import { ResponsiveLine } from '@nivo/line'

function LineChart ({data}) {

   let lineData = ['잔액','출금','입금'].map(n => ({
      id: n,
      data: Object.entries(data).map(([k,v])=>({
         x: `${k[1]}분기`,
         y: v[n]
      }))
   }))


   return (
      <div style={{width:'100%',height:'400px'}}>
         
         <ResponsiveLine
         data={lineData}
         margin={{ top: 40, right: 15, bottom: 30, left: 45 }}
         yScale={{ type: 'linear', min: 'auto', max: 'auto', }}
         pointBorderWidth={2}
         pointBorderColor={{ from: 'seriesColor' }}
         pointLabelYOffset={-12}
         enableTouchCrosshair={true}
         useMesh={true}
         legends={[
            {
               anchor: 'top-right',
               direction: 'row',
               translateX: 40,
               translateY: -40,
               itemWidth: 80,
               itemHeight: 22,
               symbolShape: 'circle',
               toggleSerie: true,
            }
         ]}
         colors={({ id }) => {
            if (id === '입금') return '#7fc97f';
            if (id === '출금') return '#faa250ff';
            if (id === '잔액') return '#beaed4';
         }}
         axisLeft={{
            tickSize: 2,
         }}
         enableGridX={false}
         />
      </div>
   )
}

export default LineChart
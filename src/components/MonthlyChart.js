import { ResponsiveBar } from '@nivo/bar'


function Chart({year, data, type}) {
   
   const yearchart = data[year];
   const key = type === 1
   ? ['입금','출금']
   : type === 2
   ? ['입금']
   : type === 3
   ? ['출금']
   : ['합산'];

   
   let twoday = yearchart.map((obj,i)=>{
      return {
         "date": (i+1),      
         "입금": obj.income,
         "출금": obj.expense,
         "합산": obj.income - obj.expense,
      }
   })
   
   
   return (
      <div style={{width:'100%',height:'400px'}}>

      <ResponsiveBar
      data={twoday}
      keys={key}
      indexBy="date"
      margin={{ top: 20, right: 60, bottom: 50, left: 50 }}
      padding={0.3}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={({ id, value }) => {
         if (id === '입금') return '#75d6b7ff';
         if (id === '출금') return '#fc8d62';
         if (id === '합산' && value < 0) return '#fc8d62';
         if (id === '합산' && value > 0) return '#75d6b7ff';
      }}
      borderColor={{
         from: 'color',
         modifiers: [
            [
               'darker',
               1.6
            ]
         ]
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
         tickSize: 5,
         tickPadding: 5,
         tickRotation: 0,
         legend: year,
         legendPosition: 'middle',
         legendOffset: 42,
         truncateTickAt: 0
      }}
      axisLeft={{
         tickSize: 0,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
         from: 'color',
         modifiers: [
            [
               'darker',
               1.6
            ]
         ]
      }}
      legends={[
         {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 110,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
               {
                  on: 'hover',
                  style: {
                           itemOpacity: 1
                        }
                     }
                  ]
               }
            ]}
      motionConfig="stiff"
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
      />
      </div>
   )
}


export default Chart
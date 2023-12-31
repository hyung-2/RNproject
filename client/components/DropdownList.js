import React,{ useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback, ScrollView } from 'react-native'

import DropdownItem from './DropdownItem'

import AntIcon from 'react-native-vector-icons/AntDesign'

const caretdownComponent = (props) => <AntIcon name='caretdown' {...props} size={15}/>
const caretupComponent = (props) => <AntIcon name='caretup' {...props} size={15}/>


function DropdownList({title, modalTitle, categories, selectedDate,  dropYearOpen, setDropYearOpen, dropMonthOpen, setDropMonthOpen, dropDateOpen, setDropDateOpen, startDate, setStartDate, endDate, setEndDate, itemKey}
  // {yearsRange, monthRange, dateRange, dropYearOpen, setDropYearOpen, selectedDate, startDate }
  ){

  //드롭다운 닫기
  const closeDropdown = () => {
    console.log('드롭다운닫힘')
    dropYearOpen && setDropYearOpen(false)
    dropMonthOpen && setDropMonthOpen(false)
    dropDateOpen && setDropDateOpen(false)
  }
  
  // //드롭다운 클릭
  const onPress = () => {
    console.log('클릭')
    if(title === '년'){
      setDropYearOpen(!dropYearOpen)
    }else if(title === '월'){
      setDropMonthOpen(!dropMonthOpen)
    }else if(title === '일'){
      setDropDateOpen(!dropDateOpen)
    }
  }

  // return(
  //   <>
  //     <TouchableOpacity style={[styles.horizontalAlign, dropYearOpen && styles.drops ]} onPress={onPress}>
  //       {dropYearOpen ? caretupComponent() : caretdownComponent()}
  //       {dropYearOpen ? 
  //       <View style={{height:200}}>
  //         <FlatList
  //           data={yearsRange}
  //           keyExtractor={item => item}
  //           renderItem={({item}) => (
  //             <View onStartShouldSetResponder={() => true}>
  //               <DropdownItem
  //                 category={item}
  //                 closeDropdown={closeDropdown}
  //               />
  //             </View>
  //           )}
  //         style={[styles.list, dropYearOpen && styles.yearOpen]}
  //         />
  //       </View>
  //        :
  //       <View style={styles.nodrops}>
  //         <Text>{startDate.year ? startDate.year : `${selectedDate.slice(0,4)}년`}</Text>
  //       </View>
  //        }
  //     </TouchableOpacity>
  //     <TouchableOpacity style={[styles.horizontalAlign, dropYearOpen && styles.drops ]} onPress={onPress}>
  //        {dropYearOpen ? caretupComponent() : caretdownComponent()}
  //        <View style={{height:200}}>
  //          <FlatList
  //           data={monthRange}
  //           keyExtractor={item => item}
  //           renderItem={({item}) => (
  //             <View onStartShouldSetResponder={() => true}>
  //               <DropdownItem
  //                 category={item}
  //                 closeDropdown={closeDropdown}
  //               />
  //             </View>
  //           )}
  //           style={[styles.list]}
  //           />
  //        </View>
  //     </TouchableOpacity>
  //     <TouchableOpacity style={[styles.horizontalAlign, dropYearOpen && styles.drops ]} onPress={onPress}>
  //        {dropYearOpen ? caretupComponent() : caretdownComponent()}
  //        <View style={{height:200}}>
  //        <FlatList
  //           data={dateRange}
  //           keyExtractor={item => item}
  //           renderItem={({item}) => (
  //               <DropdownItem
  //                 category={item}
  //                 closeDropdown={closeDropdown}
  //               />
  //           )}
  //           style={[styles.list]}
  //           />
  //        </View>
  //     </TouchableOpacity>
  //   </>
  // )

  // console.log(categories)
  return(
    <TouchableOpacity style={[styles.horizontalAlign, (dropYearOpen || dropMonthOpen || dropDateOpen) && styles.drops ]} onPress={onPress}>
        {dropYearOpen || dropMonthOpen || dropDateOpen ? caretupComponent() : caretdownComponent()}
        {dropYearOpen ?
        <View style={{height:200}}>
          <FlatList
           data={categories}
           keyExtractor={item => item}
           renderItem={({item}) => (
             <View onStartShouldSetResponder={() => true}>
               <DropdownItem
                 category={item}
                 closeDropdown={closeDropdown}
                 selectedDate={selectedDate}
                 startDate={startDate} setStartDate={setStartDate} 
                 endDate={endDate} setEndDate={setEndDate}
                 title={title} modalTitle={modalTitle}
               />
             </View>
           )}
           style={[styles.list, dropYearOpen && styles.yearOpen]}
         />
        </View>
        :
        modalTitle === '시작날짜' ? 
        title === '년' &&
        <View style={styles.nodrops}>
          <Text>{startDate.year ? startDate.year : `${selectedDate.slice(0,4)}년`}</Text>
        </View>
        :
        title === '년' &&
        <View style={styles.nodrops}>
          <Text>{endDate.year ? endDate.year : `${selectedDate.slice(0,4)}년`}</Text>
        </View>
      }
        {dropMonthOpen ?
        <View style={{height:200}}>
          <FlatList
           data={categories}
           keyExtractor={item => item}
           renderItem={({item}) => (
             <View onStartShouldSetResponder={() => true}>
               <DropdownItem
                 category={item}
                 closeDropdown={closeDropdown}
                 selectedDate={selectedDate}
                 startDate={startDate} setStartDate={setStartDate} 
                 endDate={endDate} setEndDate={setEndDate}
                 title={title} modalTitle={modalTitle}
               />
             </View>
           )}
           style={[styles.list, dropMonthOpen && styles.monthOpen]}
         />
        </View>
        :
        modalTitle === '시작날짜' ? 
        title === '월' &&
        <View style={[styles.nodrops, !dropMonthOpen && styles.month]}>
          <Text>{startDate.month ? startDate.month : `${selectedDate.slice(5,7)}월`}</Text>
        </View>
        :
        title === '월' &&
        <View style={[styles.nodrops, !dropMonthOpen && styles.month]}>
          <Text>{endDate.month ? endDate.month : `${selectedDate.slice(5,7)}월`}</Text>
        </View>

      }
        {dropDateOpen ?
        <View style={{height:200}}>
          <FlatList
           data={categories}
           keyExtractor={item => item}
           renderItem={({item}) => (
            <View onStartShouldSetResponder={() => true}>
               <DropdownItem
                 category={item}
                 closeDropdown={closeDropdown}
                 selectedDate={selectedDate}
                 startDate={startDate} setStartDate={setStartDate} 
                 endDate={endDate} setEndDate={setEndDate}
                 title={title} modalTitle={modalTitle}
               />
            </View>
           )}
           style={[styles.list, dropDateOpen && styles.dateOpen]}
         />
        </View>
        :
        modalTitle === '시작날짜' ? 
        title === '일' &&
        <View style={[styles.nodrops, styles.date]}>
          <Text>{startDate.date ? startDate.date : `${selectedDate.slice(8,10)}일`}</Text>
        </View>
        :
        title === '일' &&
        <View style={[styles.nodrops, styles.date]}>
          <Text>{endDate.date ? endDate.date : `${selectedDate.slice(8,10)}일`}</Text>
        </View>
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  view: {
    // flex: 1,
    height: 200,
  },
  horizontalAlign: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 10,
    width: 60,
    height: 20,
    // flex: 1,
  },
  list: {
    marginLeft: 10,
    flex: 1,
    width: 200,
    height: 200,
    elevation: 2,
    zIndex:2,
  },
  drops: {
    height:200, 
    justifyContent:'flex-start', 
    alignItems: 'center',
    top:0,
    zIndex:2,
    elevation: 2,
    // height: 20,
  },
  yearOpen: {
    position:'absolute', 
    left: -15,
    top: 90,
    height: 200,
  },
  monthOpen: {
    position:'absolute', 
    left: -15,
    top: 90,
    height: 200,
  },
  dateOpen: {
    position:'absolute', 
    left: -15,
    top: 90,
    height: 200,
  },
  nodrops: {
    padding: 5,
    paddingTop: 0,
    marginHorizontal: 20,
    position: 'absolute',
    left: 0
  },
})

export default DropdownList
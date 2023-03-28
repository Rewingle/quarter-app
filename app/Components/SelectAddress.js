'use client'
import React, { useEffect, useState } from 'react'
import { Box, Select, Button } from 'theme-ui'
import EnterUserInfo from './EnterUserInfo'

function SelectAddress(props) {
    const [provinces, setProvinces] = useState()
    const [districts, setDistricts] = useState()
    const [neighborhoods, setNeighborhoods] = useState()
    const [selectedProvince, setSelectedProvince] = useState()
    const [submit, setSubmit] = useState(false)
    const [selectedDistrict, setSelectedDistrict] = useState()
    const [selectedNeighborhood, setSelectedNeighborhood] = useState()
    useEffect(() => {
        //console.log('asked PROVINCES')
        getProvinces()
    }, [])
    const getProvinces = async () => {
        
        const res= await fetch('/api/addressdata', { method: 'POST', body: JSON.stringify({ selected: 'provinces' }) }).catch(err => alert(err))
        const data = await res.json()
        setProvinces(data)
        //return ['istanbul', 'ankara']
        /* const client = await MongoClient.connect(
            `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.rg9svuz.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const data = await db.collection('provinces').find({}).toArray()
        client.close()
        setProvinces(data[0].provinces) */



    }

    const handleProvince = async (e) => {
        setSelectedProvince(e.target.value)
        setNeighborhoods()
        setDistricts()
        const res = await fetch('/api/addressdata', { method: 'POST', body: JSON.stringify({ selected: 'districts', province: e.target.value }) })
        const data = await res.json()
        setDistricts(data)
    }
    const handleDistrict = async (e) => {
        setSelectedDistrict(e.target.options[e.target.selectedIndex].text)
        setNeighborhoods()
        const res = await fetch('/api/addressdata', { method: 'POST', body: JSON.stringify({ selected: 'neighborhoods', districtId: parseInt(e.target.value, 10) }) })
        const data = await res.json()
        setNeighborhoods(data)
    }
    const handleNeighborhood = (e) => {
        setSelectedNeighborhood(e.target.value)
    }
    const handleSubmit = () => {
        if (selectedDistrict && selectedNeighborhood) {
            setSubmit(true)
        }
        else {
            alert('Please select your neighborhood')
        }
    }
    return (
        <Box>
            {!submit ? <Box>
                <Box sx={{ display: 'flex' }}><Box sx={{ fontSize: 24, fontFamily: 'montserrat', fontWeight: '600', fontStyle: 'italic' }}>Find your </Box><Box color='#2DD4BF' sx={{ fontSize: 24, fontFamily: 'montserrat', marginLeft: '12px', fontWeight: '600', fontStyle: 'italic' }}>QUARTER</Box></Box>
                <Box sx={{ marginTop: '0.6em' }}>
                    <Box>Country:</Box>
                    <Select sx={{ border: '2px solid gray', backgroundColor: 'whitesmoke' }} arrow={
                        <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentcolor"
                            sx={{
                                ml: -28,
                                alignSelf: 'center',
                                pointerEvents: 'none',

                            }}>
                            <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                        </Box>
                    }
                        defaultValue="Country">
                        <option>TURKEY</option>
                    </Select>
                </Box>
                <Box sx={{ marginTop: '0.6em' }}>
                    <Box>Province:</Box>
                    <Select onChange={(e) => handleProvince(e)} sx={{ border: '2px solid gray', backgroundColor: 'whitesmoke' }} arrow={
                        <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentcolor"
                            sx={{
                                ml: -28,
                                alignSelf: 'center',
                                pointerEvents: 'none',

                            }}>
                            <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                        </Box>
                    }
                        defaultValue="Province">
                        {provinces ? <option value=''>SELECT PROVINCE</option> : null}
                        {provinces?.map(province => <option>{province.SehirAdi}</option>)}

                    </Select>
                </Box>
                <Box sx={{ marginTop: '0.6em' }}>
                    <Box>District:</Box>

                    <Select onChange={(e) => handleDistrict(e)} sx={{ border: '2px solid gray', backgroundColor: 'whitesmoke' }} arrow={
                        <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentcolor"
                            sx={{
                                ml: -28,
                                alignSelf: 'center',
                                pointerEvents: 'none',

                            }}>
                            <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                        </Box>
                    } defaultValue="District">
                        {districts ? <option value=''> SELECT DISTRICT </option> : null}
                        {districts?.map(district => <option value={district.ilceId}>{district.IlceAdi}</option>)}
                    </Select>

                </Box>
                <Box sx={{ marginTop: '0.6em' }}>
                    <Box>Neighborhood:</Box>
                    <Select onChange={(e) => handleNeighborhood(e)} sx={{ border: '2px solid gray', backgroundColor: 'whitesmoke' }} arrow={
                        <Box
                            as="svg"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentcolor"
                            sx={{
                                ml: -28,
                                alignSelf: 'center',
                                pointerEvents: 'none',

                            }}>
                            <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
                        </Box>
                    } defaultValue="Neighborhood">
                        {neighborhoods ? <option value=''> SELECT NEIGHBORHOOD </option> : null}
                        {neighborhoods?.map(neighborhood => <option>{neighborhood.MahalleAdi}</option>)}
                    </Select>
                </Box>
                <br />
                <Box>
                    <Box sx={{ float: 'left' }}>🇹🇷 Available only</Box>
                    <Button sx={styles.button} className="bg-gradient-to-r from-teal-400 to-cyan-500" onClick={() => handleSubmit()}>Continue</Button>

                </Box>
            </Box> : <EnterUserInfo address={{ district: selectedDistrict, neighborhood: selectedNeighborhood }} tempUser={props.tempUser} />}
        </Box>
    )
}

const styles = {
    button: {
        float: 'right',
        width: '8em',
        height: '40px',
        color: 'white',
        fontSize: '16',
    },
}

export default SelectAddress
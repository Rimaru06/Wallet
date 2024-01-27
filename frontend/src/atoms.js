import {atom , atomFamily , selectorFamily} from 'recoil'
import axios from 'axios'
export const loginAtom = atom({
    key : "loginAtom",
    default : {
        username : "",
        password : ""
    }
})

export const balanceAtomFamily = atomFamily({
    key: 'balanceAtomFamily',
    default : selectorFamily({
        key : 'balanceSelectorFamily',
        get : (token) => async () => {
            const res = await axios({
                url: 'http://localhost:3000/api/v1/account/balance',
                method: 'GET',
                headers: {
                    authorization: token
                }
            })
            return res.data.balance
        }
    })
})
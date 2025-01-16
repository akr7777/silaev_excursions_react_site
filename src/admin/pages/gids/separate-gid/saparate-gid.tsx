import { useEffect, useState } from "react"
import { GidType } from "../../../../store/features/gidSlice/types/gid-types"
import { useAppDispatch, useAppSelector } from "../../../../store/store"
import { useNavigate, useParams } from "react-router"
import { CREATE_NEW_ENTETY } from "../../../../shared/consts"
import { gidSliceActions } from "../../../../store/features/gidSlice/model/gid-slice"
import { gidSliceThunks } from "../../../../store/features/gidSlice/model/gid-thunks"
import { AddGidThunkReqType, UpdateGidThunkReqType } from "../../../../store/features/gidSlice/types/gid-thunk-types"
import { CustomTextField } from "../../../../components/text-field/custom-text-field"
import { CustomTextArea } from "../../../../components/text-area/text-area"
import { CustomButton } from "../../../../components/my-button/my-button"
import { UploadComponent2 } from "../../../widgets/image-upload-form/image-upload-form"
import { PATHS } from "../../../../router/router"

import "./separate-gid.scss"
import { ContactEditor } from "./contact-info/gid-contacts"
import { BgOutlet } from "../../../../components/bg-outlet/bg-outlet"
import { decodeContactsFromString } from "./contact-info/gid-cont-functions"
// import { GidContacts } from "./contact-info/gid-contacts"

export const SeparateGidPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [showC, setShowC] = useState<boolean>(false)

    const { gidId } = useParams()
    const currentGid: GidType | null = useAppSelector(state => state.gidSlice.currentGid)

    const [fullName, setFullName] = useState<string>(currentGid?.fullName || "")
    const [description, setDescription] = useState<string>(currentGid?.description || "")
    const [contactInfo, setContactInfo] = useState<string>(currentGid?.contactInfo || "")

    const initialImage: string = currentGid?.avatar || ""  
    
    const [file, setFile] = useState<File | null>(initialImage && URL.revokeObjectURL(initialImage) || null);

    useEffect(() => {
        if (gidId && gidId !== CREATE_NEW_ENTETY) {
            dispatch(gidSliceThunks.getById({gidId}))
        }
    }, [gidId])

    useEffect(() => {
        if (gidId === CREATE_NEW_ENTETY) {
            dispatch(gidSliceActions.setCurrentGid(null))
        }
        setFullName(currentGid?.fullName || "")
        setDescription(currentGid?.description || "")
        setContactInfo(currentGid?.contactInfo || "")
    }, [currentGid])

    useEffect(() => {
        if (initialImage) {
          fetch(initialImage, { mode: 'no-cors' })
            .then((response) => response.blob())
            .then((blob) => {
              const existingFile = new File([blob], "existing-image.jpg", { type: blob.type });
              setFile(existingFile);
            })
            .catch((error) => console.error("Ошибка при загрузке initialPreview:", error));
        }
      }, [initialImage]);


    const onAddNewBtnClick = () => {
        const data: AddGidThunkReqType = {
            fullName,
            description,
            contactInfo,
            file,
        }
        dispatch(gidSliceThunks.add(data))
        navigate(PATHS.gids)
    }

    const onEditNewBtnClick = () => {
        if (gidId) {
            const data: UpdateGidThunkReqType = {
                id: gidId,
                fullName,
                description,
                contactInfo,
                file,
            }
            dispatch(gidSliceThunks.update(data))
            navigate(PATHS.gids)
        }
    }

    const onDeleteNewClick = () => {
        if (gidId) {
            dispatch(gidSliceThunks.delete({ gidId }))
            navigate(PATHS.gids)
        }
    }

    return (
        <div className="separate-item-wrapper">
            {gidId && gidId !== CREATE_NEW_ENTETY
                ? <h3>Редактирование данных:</h3>
                : <h3>Создание нового экскурсовода:</h3>
            }

            <div>
                <div>ФИО:</div>
                <CustomTextField value={fullName} onChange={(newVal: string) => setFullName(newVal)} />
            </div>

            <div>
                <div>Описание:</div>
                <CustomTextArea value={description} onChange={(newVal: string) => setDescription(newVal)} />
            </div>

            <div>
                <div>Контактная информания:</div>
                {/* <CustomTextArea value={contactInfo} onChange={(newVal: string) => setContactInfo(newVal)} /> */}
                {/* <GidContacts contacts={contactInfo} onContactsChange={(newVal: string) => setContactInfo(newVal)}/> */}
                <div className="separate-gid-col">
                    <label>
                        {Object.entries(decodeContactsFromString(contactInfo))
                            .map(([key, value]) => `${key}: ${value}`)
                            .join(";\n")}
                    </label>
                    <button onClick={() => setShowC(true)}>Редактирование контактов</button>
                </div>
                {/* <label>{contactInfo}</label> */}

                {
                    showC &&
                        <BgOutlet>
                            <ContactEditor 
                                initialData={contactInfo} 
                                onSave={(updatedData: string) => {setContactInfo(updatedData)} } 
                                onClose={() => setShowC(false)}
                            />
                        </BgOutlet>
                    
                }
                
            </div>

            {/* <UploadImage /> */}

            <div>
                <h4>Форма загрузки фотографии</h4>
                {/* <UploadComponent file={file} setFile={setFile} onUpload={uploadPhotoOnServer} /> */}
                <UploadComponent2 file={file} setFile={setFile} initialPreview={initialImage} />

            </div>

            {gidId && gidId !== CREATE_NEW_ENTETY
                ? <CustomButton title="Редактировать данные" onPress={onEditNewBtnClick} />
                : <CustomButton title="Создать нового экскурсовода" onPress={onAddNewBtnClick} />
            }
            


            {gidId && 
                <CustomButton title="Удалить экскурсовода" onPress={onDeleteNewClick} class="separate-gid-delete-btn" />
            }
        </div>
    )
}
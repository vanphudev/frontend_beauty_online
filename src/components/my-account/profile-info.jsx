import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ErrorMsg02 from "../common/error-msg02";
import ErrorMsg from '../common/error-msg';
import { EmailTwo, LocationTwo, PhoneThree, UserThree } from '@/svg';
import { useUpdateProfileMutation } from '@/redux/features/auth/authApi';
import { notifyError, notifySuccess } from '@/utils/toast';
import { useGetApiProvinceQuery, useGetApiDistrictQuery, useGetApiWardQuery } from "@/redux/features/order/orderApi"

const schema = Yup.object().shape({
   name: Yup.string().required().label("Name"),
   email: Yup.string().required().email().label("Email"),
   phone: Yup.string()
      .required('Phone number is required')
      .matches(
         /^(\+84|0)(\d{9,10})$/,
         'Phone number is not valid'
      )
      .label('Phone'),
   address: Yup.string().required().label("Address"),
   province: Yup.string().required().label("Province"),
   district: Yup.string().required().label("District"),
   ward: Yup.string().required().label("Ward"),
   bio: Yup.string().required().min(20).label("Bio"),
});

const ProfileInfo = () => {
   const { user } = useSelector((state) => state.auth);
   const [updateProfile, { }] = useUpdateProfileMutation();
   const [selectedProvince, setSelectedProvince] = useState(user?.address?.province);
   const [selectedDistrict, setSelectedDistrict] = useState(user?.address?.district);
   const [selectedWard, setSelectedWard] = useState(user?.address?.ward);
   const { data: provinces, isError: provinceError, isLoading: provinceLoading } = useGetApiProvinceQuery();
   const { data: districts, isError: districtError, isLoading: districtLoading } = useGetApiDistrictQuery(selectedProvince, {
      skip: !selectedProvince,
   });
   const { data: wards, isError: wardError, isLoading: wardLoading } = useGetApiWardQuery(selectedDistrict, {
      skip: !selectedDistrict,
   });
   const handleWardChange = (e) => {
   const wardCode = e.target.value;  
   setSelectedWard(wardCode);     
};
   const handleProvinceChange = (e) => {
      const provinceCode = e.target.value;
      setSelectedProvince(provinceCode);
      setSelectedDistrict('');
   };
   const handleDistrictChange = (e) => {
      const districtCode = e.target.value;
      setSelectedDistrict(districtCode);
   };
   // react hook form
   const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(schema),
   });
   // on submit
   const onSubmit = (data) => {
      updateProfile({
         id: user?._id,
         name: data.name,
         email: data.email,
         phone: data.phone,
         address: {
            province: data.province,
            district: data.district,
            ward: data.ward,
            address: data.address
         },
         bio: data.bio,
      }).then((result) => {
         if (result?.error) {
            notifyError(result?.error?.data?.message);
         }
         else {
            notifySuccess("Cập nhật thông tin Profile thành công !");
         }
      })
      reset();
   };
   return (
      <div className="profile__info">
         <h3 className="profile__info-title">Personal Details</h3>
         <div className="profile__info-content">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="row">
                  <div className="col-xxl-6 col-md-6">
                     <div className="profile__input-box">
                        <label>Tên của bạn </label>
                        <div className="profile__input">
                           <input {...register("name", { required: `Name is required!` })} name='name' type="text" placeholder="Enter your username" defaultValue={user?.fullName} />
                           <span>
                              <UserThree />
                           </span>
                           <ErrorMsg02 msg={errors.name?.message} />
                        </div>
                     </div>
                  </div>

                  <div className="col-xxl-6 col-md-6">
                     <div className="profile__input-box">
                        <label>Email </label>
                        <div className="profile__input">
                           <input {...register("email", { required: `Email is required!` })} name='email' type="email" placeholder="Enter your email" defaultValue={user?.email} />
                           <span>
                              <EmailTwo />
                           </span>
                           <ErrorMsg02 msg={errors.email?.message} />
                        </div>
                     </div>
                  </div>

                  <div className="col-xxl-12">
                     <div className="profile__input-box">
                        <label>Phone </label>
                        <div className="profile__input">
                           <input {...register("phone", { required: true })} name='phone' type="text" placeholder="Enter your number" defaultValue={user?.phone} />
                           <span>
                              <PhoneThree />
                           </span>
                           <ErrorMsg02 msg={errors.phone?.message} />
                        </div>
                     </div>
                  </div>

                  <div className="col-xxl-12" style={{ marginBottom: '25px' }}>
                     <div className="profile__input-box">
                        <div style={{ flex: '1 1 200px', }}>
                           <label>Tên đường</label>
                           <input
                              {...register("address", { required: `Address is required!` })}
                              name='address'
                              id='address'
                              type='text'
                              defaultValue={user?.address?.address}
                              placeholder='Nhập số nhà và tên đường của bạn !'
                              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                           />
                           <ErrorMsg02 msg={errors?.address?.message} />
                        </div>
                     </div>
                  </div>

                  <div className="col-xxl-12" style={{ marginBottom: '25px' }}>
                     <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: "10px",
                        justifyContent: 'space-between',
                     }}>
                        <div style={{ flex: '1 1 200px', }}>
                           <label>Tỉnh thành</label>
                           <select {...register("province", { required: "Province is required!" })}
                              id="province"
                              name="province"
                              onChange={handleProvinceChange}
                              value={selectedProvince}
                              disabled={provinceLoading || provinceError}
                              style={{
                                 width: '100%',
                                 padding: '8px',
                                 boxSizing: 'border-box',
                              }}>
                              {provinceLoading ? (
                                 <option>Đang tải...</option>
                              ) : provinceError ? (
                                 <option>Lỗi dữ liệu</option>
                              ) : (
                                 <>
                                    <option value="">Chọn Tỉnh/Thành phố</option>
                                    {provinces?.results.map((province) => (
                                       <option key={province.province_id} value={province.province_id}>
                                          {province.province_name}
                                       </option>
                                    ))}
                                 </>
                              )}
                           </select>
                           <ErrorMsg02 msg={errors?.province?.message} />
                        </div>

                        <div style={{ flex: '1 1 200px', }}>
                           <label>Quận/Huyện</label>
                           <select
                              {...register("district", { required: `District is required!` })}
                              onChange={handleDistrictChange}
                              name="district"
                              value={selectedDistrict}
                              disabled={!selectedProvince || districtLoading || districtError}
                              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                           >
                              {!selectedProvince ? (
                                 <option value=''>Chọn Quận/huyện</option>
                              ) : districtLoading ? (
                                 <option value=''>Đang tải...</option>
                              ) : districtError ? (
                                 <option value=''>Lỗi dữ liệu</option>
                              ) : (
                                 <>
                                    <option value=''>Chọn Quận/Huyện</option>
                                    {districts?.results.map((district) => (
                                       <option key={district.district_id} value={district.district_id}>
                                          {district.district_name}
                                       </option>
                                    ))}
                                 </>
                              )}
                           </select>
                           <ErrorMsg02 msg={errors?.district?.message} />
                        </div>

                        <div style={{ flex: '1 1 200px', }}>
                           <label>Xã/Phường</label>
                           <select
                              {...register("ward", { required: `Ward is required!` })}
                              name="ward"
                              onChange={(e) => handleWardChange(e)}  
                              value={selectedWard}
                              disabled={!selectedDistrict || wardLoading || wardError}
                              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                           >
                              {!selectedDistrict ? (
                                 <option value=''>Chọn Xã/Phường</option>
                              ) : wardLoading ? (
                                 <option value=''>Đang tải...</option>
                              ) : wardError ? (
                                 <option value=''>Lỗi dữ liệu</option>
                              ) : (
                                 <>
                                    <option value=''>Chọn Xã/Phường</option>
                                    {wards?.results.map((ward) => (
                                       <option key={ward.ward_id} value={ward.ward_id}>
                                          {ward.ward_name}
                                       </option>
                                    ))}
                                 </>
                              )}
                           </select>
                           <ErrorMsg02 msg={errors?.ward?.message} />
                        </div>
                     </div>
                  </div>

                  <div className="col-xxl-12">
                     <div className="profile__input-box">
                        <label>Mô tả </label>
                        <div className="profile__input">
                           <textarea {...register("bio", { required: true })} name='bio' placeholder="Enter your bio" defaultValue={user?.bio} />
                           <ErrorMsg02 msg={errors.bio?.message} />
                        </div>
                     </div>
                  </div>
                  <div className="col-xxl-12">
                     <div className="profile__btn">
                        <button type="submit" className="tp-btn">Update Profile</button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default ProfileInfo;
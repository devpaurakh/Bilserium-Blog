using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BisleriumBlog.Application.DTOs;

namespace BisleriumBlog.Application.Common.Interface
{
    public interface IAuthentication
    {
        Task<ResponseDTO> Register(UserRegisterRequestDto model);
        Task<ResponseDTO> Login(UserLoginRequestDTO model);
        Task<IEnumerable<UserDetailsDTO>> GetUserDetails();
        Task<ResponseDTO> ForgotPassword(string email, string password);
        //Task<ResponseDTO> UpdatePassword(string userId, UpdatePasswordRequestDTO model);
        
    }
}

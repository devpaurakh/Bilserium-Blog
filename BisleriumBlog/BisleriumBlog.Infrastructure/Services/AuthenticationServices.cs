using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using BisleriumBlog.Application.Common.Interface;
using BisleriumBlog.Application.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BisleriumBlog.Infrastructure.Services
{
    public class AuthenticationService : IAuthentication
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        // private readonly ForgotPasswordRequest
        // private readonly JwtManager<IdentityUser> jwtManager;

        public AuthenticationService(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        // Regisster
        public async Task<ResponseDTO> Register(UserRegisterRequestDto model)
        {
            var userExists = await _userManager.FindByNameAsync(model.Username);
            if (userExists != null)
                return new ResponseDTO { Status = "Error", Message = "User already exists!" };

            IdentityUser user = new()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
                return new ResponseDTO
                    { Status = "Error", Message = "User creation failed! Please check user details and try again." };

            return new ResponseDTO { Status = "Success", Message = "User created successfully!" };
        }

        // Login User
        public async Task<ResponseDTO> Login(UserLoginRequestDTO model)
        {
            var result = await _signInManager.PasswordSignInAsync(model.Username, model.Password, true, false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByNameAsync(model.Username);
                // var token = GenerateJwtToken(user); // Method to generate the token

                return new ResponseDTO()
                {
                    Message = "Login successful",
                    Status = "Success",
                    Data = user.Email
                };
            }

            return new ResponseDTO()
            {
                Message = "User login failed! Please check user details and try again.!",
                Status = "Error"
            };

        }

        // to provide token or POST request
        /*[AllowAnonymous]
        public string Get(string username, string password)
        {
                return JwtManager.GenerateToken(username);
        }*/

        public async Task<IEnumerable<UserDetailsDTO>> GetUserDetails()
        {
            var users = await _userManager.Users.Select(x => new
            {
                x.Email,
                x.UserName,
                x.EmailConfirmed
            }).ToListAsync();

            // either
            var userDetails = from userData in users
                              select new UserDetailsDTO()
                              {
                                  Email = userData.Email,
                                  UserName = userData.UserName,
                                  IsEmailConfirmed = userData.EmailConfirmed
                              };

            // OR
            var userDatas = new List<UserDetailsDTO>();
            foreach (var item in users)
            {
                userDatas.Add(new UserDetailsDTO()
                {
                    Email = item.Email,
                    UserName = item.UserName,
                    IsEmailConfirmed = item.EmailConfirmed
                });
            }

            return userDatas;
        }


        // Reset Password (Forgot Password)
        public async Task<ResponseDTO> ForgotPassword(string email, string newPassword)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return new ResponseDTO { Status = "Error", Message = "User not found!" };

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
            if (!result.Succeeded)
                return new ResponseDTO { Status = "Error", Message = "Failed to reset password!" };

            return new ResponseDTO { Status = "Success", Message = "Password reset successfully!" };
        }
    }
}

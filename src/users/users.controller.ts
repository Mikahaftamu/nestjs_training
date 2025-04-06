import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';


@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({
    description: 'The user has not been created.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  // findAll(@Query('role') role?: "ADMIN" | "USER") {
  //   return this.usersService.findAll(role);
  // }
  @ApiOperation({ summary: 'Get all users' })  // Describe what the endpoint does
  @ApiQuery({
    name: 'role',  // Query parameter name
    required: false,  // The role is optional
    type: String,  // The type of the query parameter
    enum: ['ADMIN', 'USER'],  // Acceptable values for the role query parameter
    description: 'Filter users by role (ADMIN or USER)',  // A short description of the query parameter
  })
  @ApiResponse({
    status: 200,
    description: 'List of users successfully retrieved',
    type: [CreateUserDto],  // Assume `User` is a DTO or class that represents the user data structure
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request (if any query parameters are invalid)',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  findAll(@Query('role') role?: 'ADMIN' | 'USER') {
    return this.usersService.findAll(role);  // Call your service to get users based on role
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })  // Describe the purpose of the endpoint
  @ApiParam({
    name: 'id',  // The name of the parameter in the URL (e.g., /users/:id)
    required: true,  // This parameter is required
    type: String,  // The type of the parameter
    description: 'The unique ID of the user to retrieve',  // A description of the parameter
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully',
    type: CreateUserDto,  // The type of the expected response
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',  // If the user with the given ID is not found
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',  // A general server error response
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'The ID of the user to update',
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'The data to update the user with',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    required: true,
    type: String,
    description: 'The ID of the user to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })  
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  }) 
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

 // data/snippetsData.js
 const snippetsData = [
    {
      title: "Laravel Authentication",
      language: "php",
      code: `<?php
  
  namespace App\\Http\\Controllers\\Auth;
  
  use App\\Http\\Controllers\\Controller;
  use Illuminate\\Http\\Request;
  use Illuminate\\Support\\Facades\\Auth;
  use App\\Models\\User;
  
  class AuthController extends Controller
  {
      public function login(Request $request)
      {
          $credentials = $request->validate([
              'email' => 'required|email',
              'password' => 'required',
          ]);
  
          if (Auth::attempt($credentials)) {
              $request->session()->regenerate();
              return redirect()->intended('dashboard');
          }
  
          return back()->withErrors([
              'email' => 'The provided credentials do not match our records.',
          ]);
      }
  
      public function logout(Request $request)
      {
          Auth::logout();
          $request->session()->invalidate();
          $request->session()->regenerateToken();
          return redirect('/');
      }
  }`,
      description: "A Laravel authentication controller that handles user login and logout functionality."
    },
    {
      title: "React Data Fetching",
      language: "javascript",
      code: `import React, { useState, useEffect } from 'react';
  
  function DataFetchingComponent() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('https://api.example.com/data');
          
          if (!response.ok) {
            throw new Error(\`HTTP error! Status: \${response.status}\`);
          }
          
          const result = await response.json();
          setData(result);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      }
  
      fetchData();
    }, []);
  
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    return (
      <div>
        <h2>Data from API</h2>
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default DataFetchingComponent;`,
      description: "A React component that fetches data from an API with loading and error states."
    },
    {
      title: "Unity Player Movement",
      language: "csharp",
      code: `using System.Collections;
  using System.Collections.Generic;
  using UnityEngine;
  
  public class PlayerMovement : MonoBehaviour
  {
      [SerializeField] private float moveSpeed = 5f;
      [SerializeField] private float jumpForce = 5f;
      [SerializeField] private LayerMask groundLayer;
      [SerializeField] private Transform groundCheck;
      [SerializeField] private float groundCheckRadius = 0.2f;
      
      private Rigidbody2D rb;
      private bool isGrounded;
      private float horizontalInput;
      
      private void Awake()
      {
          rb = GetComponent<Rigidbody2D>();
      }
      
      private void Update()
      {
          // Check if player is on the ground
          isGrounded = Physics2D.OverlapCircle(groundCheck.position, groundCheckRadius, groundLayer);
          
          // Get horizontal input
          horizontalInput = Input.GetAxisRaw("Horizontal");
          
          // Handle jumping
          if (Input.GetButtonDown("Jump") && isGrounded)
          {
              rb.velocity = new Vector2(rb.velocity.x, jumpForce);
          }
      }
      
      private void FixedUpdate()
      {
          // Move the player horizontally
          rb.velocity = new Vector2(horizontalInput * moveSpeed, rb.velocity.y);
      }
  }`,
      description: "A Unity script for basic 2D player movement, including running and jumping mechanics."
    },
    // Add more code snippets as needed
  ];
  
  export default snippetsData;